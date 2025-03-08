'use client';

import { ArrowUp, ArrowDown, Minus, BarChart2 } from 'lucide-react';

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
    <div className="bg-white rounded-lg p-4 shadow-sm h-full google-card">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium text-gray-800">Customer Sentiment Analysis</h2>
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          Last 30 days
        </div>
      </div>
      
      <div className="flex mb-4">
        <div className="flex-1 relative h-6" style={{ flex: sentimentData.positive }}>
          <div className="absolute inset-0 bg-green-100 rounded-l-full"></div>
          <div className="absolute inset-0 flex items-center pl-3">
            <span className="text-xs font-medium text-green-800">
              {calculatePercentage(sentimentData.positive)}%
            </span>
          </div>
        </div>
        <div className="flex-1 relative h-6" style={{ flex: sentimentData.neutral }}>
          <div className="absolute inset-0 bg-gray-100"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-800">
              {calculatePercentage(sentimentData.neutral)}%
            </span>
          </div>
        </div>
        <div className="flex-1 relative h-6" style={{ flex: sentimentData.negative }}>
          <div className="absolute inset-0 bg-red-100 rounded-r-full"></div>
          <div className="absolute inset-0 flex items-center justify-end pr-3">
            <span className="text-xs font-medium text-red-800">
              {calculatePercentage(sentimentData.negative)}%
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
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
      
      <div className="border-t pt-3 mt-2">
        <h3 className="text-sm font-medium mb-2">Top Sentiment Keywords</h3>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">Quality (+24%)</span>
          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">Comfortable (+18%)</span>
          <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full">Size (-15%)</span>
          <span className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full">Shipping (-12%)</span>
          <span className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded-full">Material (0%)</span>
        </div>
        
        <div className="mt-4 border-t pt-3">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Sentiment Trend</h3>
            <span className="text-xs text-gray-500">Last 7 days</span>
          </div>
          <div className="flex items-center justify-between h-16 px-2">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 w-6 h-8 rounded-t-sm"></div>
              <span className="text-xs text-gray-500 mt-1">Mon</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 w-6 h-12 rounded-t-sm"></div>
              <span className="text-xs text-gray-500 mt-1">Tue</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 w-6 h-6 rounded-t-sm"></div>
              <span className="text-xs text-gray-500 mt-1">Wed</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-red-100 w-6 h-10 rounded-t-sm"></div>
              <span className="text-xs text-gray-500 mt-1">Thu</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 w-6 h-14 rounded-t-sm"></div>
              <span className="text-xs text-gray-500 mt-1">Fri</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 w-6 h-10 rounded-t-sm"></div>
              <span className="text-xs text-gray-500 mt-1">Sat</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 w-6 h-12 rounded-t-sm"></div>
              <span className="text-xs text-gray-500 mt-1">Sun</span>
            </div>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-3">
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
    <div className={`rounded-lg p-2 ${getColorClass()}`}>
      <h3 className="text-xs font-medium mb-1">{title}</h3>
      <div className="flex justify-between items-end">
        <p className="text-base font-semibold">{value}</p>
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