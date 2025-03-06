'use client';

import { useState, useEffect } from "react";
// Fix the import by importing directly - not using the named import syntax
import ActionCard from "@/components/ActionCard";

export default function PromotePage() {
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
  if (!data || !data.suggestedActions) return <div className="p-6">No data available</div>;
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-indigo-500">Suggested Actions</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {data.suggestedActions.map((action) => (
          <ActionCard 
            key={action.id}
            number={action.id}
            title={action.title || ""}
            image={action.image || "/placeholder.jpg"}
            description={action.description || ""}
          />
        ))}
      </div>
    </div>
  );
}