'use client';

import { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

export function AIInsights({ insights }) {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  
  const handlePrevious = () => {
    if (!transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentInsight(prev => (prev === 0 ? insights.length - 1 : prev - 1));
        setTransitioning(false);
      }, 300);
    }
  };
  
  const handleNext = () => {
    if (!transitioning) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentInsight(prev => (prev === insights.length - 1 ? 0 : prev + 1));
        setTransitioning(false);
      }, 300);
    }
  };
  
  const currentInsightData = insights[currentInsight];

  return (
    <div className="bg-gradient-to-r from-[#4e8de7] via-[#9374c3] to-[#b86991] rounded-lg p-5 shadow-md text-white h-full google-card flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2" />
            <h2 className="text-lg font-medium">Gemini Insights</h2>
          </div>
          
          <div className="text-xs font-medium">
            {currentInsight + 1} of {insights.length}
          </div>
        </div>
        
        <div 
          className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 transition-opacity duration-300 ${transitioning ? 'opacity-0' : 'opacity-100'}`} 
          style={{ minHeight: '160px' }}
        >
          <p className="text-white text-base leading-relaxed">{currentInsightData.content}</p>
        </div>
      </div>
      
      <div className="mt-auto">
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
              className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
              aria-label="Previous insight"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
              aria-label="Next insight"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}