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
import { CustomerSentiment } from "@/components/CustomerSentiment";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dashboardData");
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  if (isLoading) return <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  </div>;
  
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!data) return <div className="p-6">No data available</div>;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 w-full overflow-hidden"
    >
      <h1 className="text-3xl font-semibold text-indigo-500">Return Analytics</h1>
      
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
  );
}