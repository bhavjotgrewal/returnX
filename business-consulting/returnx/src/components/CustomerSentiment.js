'use client';

import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

// Ensure we're using a named export, not default export
export function CustomerSentiment({ sentimentData }) {
  const total = sentimentData.positive + sentimentData.neutral + sentimentData.negative;
  
  const calculatePercentage = (value) => {
    return Math.round((value / total) * 100);
  };
  
  const calculateChange = (current, previous) => {
    const change = current - previous;
    const percentage = previous === 0 ? 0 : Math.round((change / previous) * 100);
    
    return {
      value: change,
      percentage,
      isPositive: change >= 0
    };
  };
  
  const positiveChange = calculateChange(sentimentData.positive, sentimentData.previousPositive);
  const negativeChange = calculateChange(sentimentData.negative, sentimentData.previousNegative);
  const neutralChange = calculateChange(sentimentData.neutral, sentimentData.previousNeutral);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm h-full google-card" style={{ minHeight: '320px' }}>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Customer Sentiment Analysis</h2>
      
      <div className="flex mb-6">
        <div className="flex-1 relative h-8">
          <div className="absolute inset-0 bg-green-100 rounded-l-full"></div>
          <div className="absolute inset-0 flex items-center pl-3">
            <span className="text-xs font-medium text-green-800">
              {calculatePercentage(sentimentData.positive)}%
            </span>
          </div>
        </div>
        <div className="flex-1 relative h-8">
          <div className="absolute inset-0 bg-gray-100"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-800">
              {calculatePercentage(sentimentData.neutral)}%
            </span>
          </div>
        </div>
        <div className="flex-1 relative h-8">
          <div className="absolute inset-0 bg-red-100 rounded-r-full"></div>
          <div className="absolute inset-0 flex items-center justify-end pr-3">
            <span className="text-xs font-medium text-red-800">
              {calculatePercentage(sentimentData.negative)}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <SentimentCard 
          title="Positive" 
          value={sentimentData.positive} 
          percentage={calculatePercentage(sentimentData.positive)}
          change={positiveChange}
          color="green"
        />
        
        <SentimentCard 
          title="Neutral" 
          value={sentimentData.neutral} 
          percentage={calculatePercentage(sentimentData.neutral)}
          change={neutralChange}
          color="gray"
        />
        
        <SentimentCard 
          title="Negative" 
          value={sentimentData.negative} 
          percentage={calculatePercentage(sentimentData.negative)}
          change={negativeChange}
          color="red"
        />
      </div>
      
      <div className="mt-5 border-t pt-4">
        <p className="text-sm text-gray-600">
          Sentiment is analyzed from customer return comments and feedback.
        </p>
      </div>
    </div>
  );
}

function SentimentCard({ title, value, percentage, change, color }) {
  const getColorClass = () => {
    switch (color) {
      case 'green':
        return 'bg-green-50 text-green-800';
      case 'red':
        return 'bg-red-50 text-red-800';
      default:
        return 'bg-gray-50 text-gray-800';
    }
  };
  
  const getChangeIcon = () => {
    if (change.value === 0) return <Minus className="h-3 w-3" />;
    return change.isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };
  
  const getChangeColorClass = () => {
    if (change.value === 0) return 'text-gray-500';
    
    if (color === 'green') {
      return change.isPositive ? 'text-green-600' : 'text-red-600';
    } else if (color === 'red') {
      return change.isPositive ? 'text-red-600' : 'text-green-600';
    } else {
      return change.isPositive ? 'text-green-600' : 'text-red-600';
    }
  };

  return (
    <div className={`rounded-lg p-3 ${getColorClass()}`}>
      <h3 className="text-xs font-medium mb-1">{title}</h3>
      <div className="flex justify-between items-end">
        <p className="text-lg font-semibold">{value}</p>
        <div className="flex items-center space-x-1">
          <div className={`flex items-center ${getChangeColorClass()}`}>
            {getChangeIcon()}
            <span className="text-xs font-medium ml-0.5">
              {Math.abs(change.percentage)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}