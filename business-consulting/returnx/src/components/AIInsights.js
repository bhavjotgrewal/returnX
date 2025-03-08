'use client';

import { useState } from 'react';
import { Lightbulb } from 'lucide-react';

export function AIInsights({ insights }) {
  const [currentInsight, setCurrentInsight] = useState(0);
  
  const handlePrevious = () => {
    setCurrentInsight(prev => (prev === 0 ? insights.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentInsight(prev => (prev === insights.length - 1 ? 0 : prev + 1));
  };
  
  const currentInsightData = insights[currentInsight];

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-5 shadow-md text-white h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Lightbulb className="h-5 w-5 mr-2" />
          <h2 className="text-lg font-medium">AI Insights</h2>
        </div>
        
        <div className="text-xs font-medium">
          {currentInsight + 1} of {insights.length}
        </div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
        <p className="text-white">{currentInsightData.content}</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <span className="text-xs">Data confidence:</span>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`h-2 w-2 rounded-full ${i < currentInsightData.confidence ? 'bg-white' : 'bg-white/30'}`} 
              />
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={handlePrevious}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}