'use client';

import { useState, useEffect } from "react";
import { ReturnStats } from "@/components/ReturnStats";
import { ReturnsChart } from "@/components/ReturnsChart";
import { TopReturnedProducts } from "@/components/TopReturnedProducts";
import { GenerateActionsButton } from "@/components/GenerateActionsButton";

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
  
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!data) return <div className="p-6">No data available</div>;
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-indigo-500">Return Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReturnsChart chartData={data.chartData} />
        </div>
        <div className="lg:col-span-1">
          <TopReturnedProducts products={data.topReturnedProducts} />
        </div>
      </div>
      
      <ReturnStats stats={data.stats} />
      
      <div className="flex justify-center mt-8">
        <GenerateActionsButton />
      </div>
    </div>
  );
}