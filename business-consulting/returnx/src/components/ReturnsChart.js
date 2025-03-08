'use client';

import { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

export function ReturnsChart({ chartData: initialChartData }) {
  const [timeRange, setTimeRange] = useState('This Month');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [chartData, setChartData] = useState(initialChartData);
  
  // Handle outside clicks to close the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const timeRanges = [
    'This Month', 
    'Last Month', 
    'Last 3 Months', 
    'Last 6 Months', 
    'This Year'
  ];
  
  const handleTimeRangeChange = (range) => {
    // Only update if the selected range is different from the current one
    if (range !== timeRange) {
      setTimeRange(range);
      setIsDropdownOpen(false);
      
      // Generate different data based on the selected range
      let newData;
      
      switch(range) {
        case 'Last Month':
          newData = generateMockData(30000, 55000, false);
          break;
        case 'Last 3 Months':
          newData = generateMockData(35000, 65000, false);
          break;
        case 'Last 6 Months':
          newData = generateMockData(25000, 70000, false);
          break;
        case 'This Year':
          newData = generateMockData(20000, 80000, false);
          break;
        default: // This Month
          newData = generateMockData(30000, 60000, false);
      }
      
      setChartData(newData);
    } else {
      // Just close the dropdown if the same range is selected
      setIsDropdownOpen(false);
    }
  };
  
  // Function to generate mock data
  const generateMockData = (min, max, hasSpike) => {
    let data = [];
    let startDate, endDate, format;
    const now = new Date();
    
    switch(timeRange) {
      case 'Last Month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        format = 'day';
        break;
      case 'Last 3 Months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        endDate = new Date();
        format = 'month';
        break;
      case 'Last 6 Months':
        startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        endDate = new Date();
        format = 'month';
        break;
      case 'This Year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date();
        format = 'month';
        break;
      default: // This Month
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        format = 'day';
    }
    
    // Generate dates between start and end dates
    if (format === 'day') {
      // Days within the month
      const daysInRange = (endDate - startDate) / (1000 * 60 * 60 * 24);
      
      for (let i = 0; i < daysInRange; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        data.push({
          day: currentDate.getDate(),
          date: `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}`,
          value: min + Math.floor(Math.random() * (max - min))
        });
      }
    } else {
      // Months within the range
      const months = [];
      let currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        months.push(new Date(currentDate));
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
      
      data = months.map((date, index) => ({
        day: date.toLocaleString('default', { month: 'short' }),
        date: `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`,
        value: min + Math.floor(Math.random() * (max - min))
      }));
    }
    
    return data;
  };
  
  // Calculate the maximum value for Y-axis
  const maxValue = Math.max(...chartData.map(item => item.value)) * 1.1;
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-google-blue text-white px-3 py-2 rounded shadow-md" style={{ backgroundColor: "#4e8de7" }}>
          <p className="font-semibold">{payload[0].payload.date}</p>
          <p className="text-sm">{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm h-full overflow-hidden google-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800">Returns Overview</h2>
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-1 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md transition-colors"
          >
            <span>{timeRange}</span>
            <ChevronDown size={16} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg overflow-hidden z-20">
              <ul className="py-1">
                {timeRanges.map((range) => (
                  <li key={range}>
                    <button
                      onClick={() => handleTimeRangeChange(range)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        timeRange === range ? 'bg-google-blue bg-opacity-10 text-google-blue' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {range}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 15 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4e8de7" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4e8de7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#EEF2F6" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tickMargin={10}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              label={{ 
                value: 'Time Period', 
                position: 'insideBottom', 
                offset: -15, 
                fill: '#6B7280',
                fontSize: 12
              }}
            />
            <YAxis 
              domain={[0, maxValue]} 
              axisLine={false} 
              tickLine={false} 
              tickMargin={10}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => `${value >= 1000 ? `${Math.floor(value / 1000)}k` : value}`}
              label={{ 
                value: 'Return Volume', 
                angle: -90, 
                position: 'insideLeft', 
                offset: 0,
                fill: '#6B7280',
                fontSize: 12
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4e8de7"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#4e8de7', stroke: '#fff', strokeWidth: 2 }}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}