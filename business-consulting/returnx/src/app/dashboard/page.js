'use client';

import { useState, useEffect } from "react";
import { ReturnStats } from "@/components/ReturnStats";
import { ReturnsChart } from "@/components/ReturnsChart";
import { TopReturnedProducts } from "@/components/TopReturnedProducts";
import { GenerateActionsButton } from "@/components/GenerateActionsButton";
import { ReturnReasons } from "@/components/ReturnReasons";
import { ReturnLocations } from "@/components/ReturnLocations";
import { AIInsights } from "@/components/AIInsights";
import { QCStatusPanel } from "@/components/QCStatusPanel";
// Make sure we're importing CustomerSentiment correctly
import { CustomerSentiment } from "@/components/CustomerSentiment";
import { Header } from "@/components/Header";
import { GoogleLoader, GeminiLoader } from "@/components/LoadingIndicator";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    async function fetchData() {
      try {
        // Add a short delay before the fetch to give the server time to initialize
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const res = await fetch("/api/dashboardData");
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        setData(result);
        setError(null);
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
  }, [isLoading, retryCount]);
  
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
  
  if (!data) return <div className="p-6">No data available</div>;
  
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
          <h1 className="text-3xl font-semibold text-google-blue">Return Analytics</h1>
          
          <ReturnStats stats={data.stats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main chart - spans 2 columns on large screens */}
            <div className="lg:col-span-2">
              <ReturnsChart chartData={data.chartData} />
            </div>
            
            {/* Top products panel */}
            <div className="lg:col-span-1">
              <TopReturnedProducts products={data.topReturnedProducts} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Return reasons chart */}
            <div className="lg:col-span-1">
              <ReturnReasons data={data.returnReasons} />
            </div>
            
            {/* AI insights panel */}
            <div className="lg:col-span-1">
              <AIInsights insights={data.aiInsights} />
            </div>
            
            {/* Top return locations */}
            <div className="lg:col-span-1">
              <ReturnLocations data={data.returnLocations} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* QC Status panel */}
            <div>
              <QCStatusPanel qcItems={data.qcItems} />
            </div>
            
            {/* Customer sentiment analysis */}
            <div>
              <CustomerSentiment sentimentData={data.customerSentiment} />
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <GenerateActionsButton />
          </div>
        </motion.div>
      </div>
    </>
  );
}