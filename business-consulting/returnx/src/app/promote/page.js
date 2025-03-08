'use client';

import { useState, useEffect } from "react";
import ActionCard from "@/components/ActionCard";
import { motion } from "framer-motion";

export default function PromotePage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCards, setVisibleCards] = useState(0);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dashboardData");
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        setData(result);
        
        // Start showing cards one by one
        let count = 0;
        const interval = setInterval(() => {
          count++;
          setVisibleCards(count);
          if (count >= result.suggestedActions.length) {
            clearInterval(interval);
          }
        }, 800);
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
    
    return () => {
      setVisibleCards(0);
    };
  }, []);
  
  if (isLoading) return <div className="flex justify-center items-center h-screen ml-16 md:ml-60">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  </div>;
  
  if (error) return <div className="p-6 ml-16 md:ml-60 text-red-500">Error: {error}</div>;
  if (!data || !data.suggestedActions) return <div className="p-6 ml-16 md:ml-60">No data available</div>;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 w-full p-6 overflow-hidden"
    >
      <h1 className="text-3xl font-semibold text-indigo-500">Suggested Actions</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {data.suggestedActions.slice(0, visibleCards).map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ActionCard 
              number={action.id}
              title={action.title}
              image={action.image}
              description={action.description}
            />
          </motion.div>
        ))}
        
        {visibleCards < data.suggestedActions.length && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-pulse flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mb-3"></div>
              <p className="text-indigo-500">Generating AI recommendations...</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}