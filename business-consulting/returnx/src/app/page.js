'use client';

import { useState, useEffect } from "react";
import { ReturnStats } from "@/components/ReturnStats";
import { ReturnsChart } from "@/components/ReturnsChart";
import { TopReturnedProducts } from "@/components/TopReturnedProducts";
import { GenerateActionsButton } from "@/components/GenerateActionsButton";
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
  
  if (isLoading) return <div className="flex justify-center items-center h-screen ml-16 md:ml-60">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  </div>;
  
  if (error) return <div className="p-6 ml-16 md:ml-60 text-red-500">Error: {error}</div>;
  if (!data) return <div className="p-6 ml-16 md:ml-60">No data available</div>;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 w-full p-6 ml-16 md:ml-60"
    >
      <h1 className="text-3xl font-semibold text-indigo-500">Return Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReturnsChart chartData={data.chartData} />
        </div>
        <div className="lg:col-span-1">
          <TopReturnedProducts products={data.topReturnedProducts} />
        </div>
      </div>
      
      <ReturnStats stats={data.stats} />
      
      <div className="flex justify-end mt-8">
        <GenerateActionsButton />
      </div>
    </motion.div>
  );
}