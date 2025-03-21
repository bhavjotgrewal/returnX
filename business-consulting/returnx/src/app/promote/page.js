'use client';

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import ActionCard from "@/components/ActionCard";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { GoogleLoader, GeminiLoader } from "@/components/LoadingIndicator";

// Create a client component that uses search params
function PromotePageContent() {
  const [data, setData] = useState(null);
  const [returnData, setReturnData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCards, setVisibleCards] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  
  // Get query parameters
  const searchParams = useSearchParams();
  const returnId = searchParams.get('returnId');
  const productId = searchParams.get('productId');
  
  useEffect(() => {
    async function fetchData() {
      try {
        // Add a short delay before the fetch to give the server time to initialize
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // First, if we have a returnId, fetch the return data to get the image
        let returnImagePath = null;
        if (returnId) {
          try {
            const returnResponse = await fetch(`/api/returns`);
            if (returnResponse.ok) {
              const allReturns = await returnResponse.json();
              const thisReturn = allReturns.find(r => r.id === returnId);
              if (thisReturn) {
                setReturnData(thisReturn);
                returnImagePath = thisReturn.imagePath;
              }
            }
          } catch (returnError) {
            console.error("Error fetching return data:", returnError);
          }
        }
        
        // Next, fetch the suggestions data
        let url = "/api/returns_analysis/dashboardData";
        const params = new URLSearchParams();
        
        if (productId) {
          params.append('productId', productId);
        }
        
        if (returnId) {
          params.append('returnId', returnId);
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        
        // Use the return image for all suggestions if available
        const transformedData = {
          ...result,
          suggestedActions: result.suggestedActions.map((action) => ({
            ...action,
          }))
        };
        
        setData(transformedData);
        setError(null);
        
        // Start the card animation after a brief delay
        setTimeout(() => {
          startCardAnimation(transformedData.suggestedActions);
        }, 500);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        
        // Retry up to 3 times with increasing delay
        if (retryCount < 3) {
          const retryDelay = 1000 * (retryCount + 1); // 1s, 2s, 3s
          console.log(`Retrying in ${retryDelay}ms... (Attempt ${retryCount + 1}/3)`);
          
          setTimeout(() => {
            setRetryCount(prevCount => prevCount + 1);
          }, retryDelay);
        }
      } finally {
        if (retryCount >= 3 || !error) {
          setIsLoading(false);
        }
      }
    }
    
    if (isLoading) {
      fetchData();
    }
    
    return () => {
      setVisibleCards(0);
    };
  }, [isLoading, retryCount, productId, returnId]);
  
  // Handle card animation
  const startCardAnimation = (actions) => {
    if (!actions) return;
    
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCards(count);
      if (count >= actions.length) {
        clearInterval(interval);
      }
    }, 800);
  };
  
  // Handle action applied (remove from list)
  const handleActionApplied = (actionId) => {
    if (data && data.suggestedActions) {
      const updatedActions = data.suggestedActions.filter(action => action.id !== actionId);
      setData({
        ...data,
        suggestedActions: updatedActions
      });
    }
  };
  
  // Allow manual retry
  const handleRetry = () => {
    setIsLoading(true);
    setRetryCount(0);
  };
  
  if (isLoading) return <div className="flex justify-center items-center h-screen">
    <GoogleLoader />
  </div>;
  
  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-4">
        <p>Error: {error}</p>
      </div>
      <button 
        onClick={handleRetry}
        className="google-button px-4 py-2 mt-2"
      >
        Retry
      </button>
    </div>
  );
  
  if (!data || !data.suggestedActions) return <div className="p-6">No data available</div>;
  
  return (
    <>
      <Header />
      <div className="w-full flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 w-full max-w-7xl p-6 mt-16 mb-24 text-left"
          style={{ width: '100%', minHeight: '80vh' }}
        >
          {returnData && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h2 className="text-lg font-medium text-blue-800 mb-2">
                Suggestions Based on Return Analysis
              </h2>
              <div className="flex items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium">Return Reason:</p>
                  <p className="text-sm text-gray-700 mb-2">{returnData.reason}</p>
                  {returnData.analysis && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">AI Analysis:</p>
                      <p className="text-sm text-gray-700">
                        {returnData.analysis.defectsFound ? 
                          `Defect found: ${returnData.analysis.defectType}` : 
                          "No defects detected in the image"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <h1 className="text-3xl font-semibold text-google-blue">
            {data.productName 
              ? `Suggested Actions for ${data.productName}` 
              : 'Suggested Actions'}
          </h1>
          
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence>
              {data.suggestedActions.slice(0, visibleCards).map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ActionCard 
                    number={action.id}
                    title={action.title}
                    description={action.description}
                    improvedDescription={action.improvedDescription}
                    onActionApplied={handleActionApplied}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {visibleCards < data.suggestedActions.length && (
              <div className="flex justify-center items-center py-8">
                <div className="flex flex-col items-center">
                  <GeminiLoader />
                </div>
              </div>
            )}
            
            {data.suggestedActions.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="bg-gray-50 rounded-full p-6 mb-4">
                  <svg className="h-12 w-12 text-google-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">All Actions Applied!</h3>
                <p className="text-gray-600 max-w-md">
                  You've successfully applied all suggested actions. Check back later for new suggestions.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

// Loading fallback for Suspense
function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-screen">
      <GoogleLoader />
    </div>
  );
}

// Main page component with Suspense boundary
export default function PromotePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PromotePageContent />
    </Suspense>
  );
}