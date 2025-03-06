export function ReturnsChart({ chartData }) {
    // Convert data to SVG path and points
    const generateChartPath = (data) => {
      // Find min and max values to scale the chart
      const max = Math.max(...data.map(d => d.value));
      
      // Convert data to SVG path coordinates
      const scaleFactor = 160 / max; // 160 is the chart height
      
      // Generate points for the line
      const points = data.map((d, i) => {
        const x = (i * 50); // 50px spacing
        const y = 160 - (d.value * scaleFactor); // Invert Y axis
        return `${x},${y}`;
      });
      
      // Create line path
      const linePath = `M${points.join(' L')}`;
      
      // Create area path (same as line, but closed at the bottom)
      const areaPath = `${linePath} L${(data.length - 1) * 50},200 L0,200 Z`;
      
      return { linePath, areaPath, points: data.map((d, i) => ({ 
        x: i * 50, 
        y: 160 - (d.value * scaleFactor),
        value: d.value,
        day: d.day
      })) };
    };
    
    const { linePath, areaPath, points } = generateChartPath(chartData);
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">This Month</h2>
          <select className="border border-gray-300 rounded-md text-sm p-1">
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </div>
        <div className="h-64 relative">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Grid lines */}
            <line x1="0" y1="160" x2="400" y2="160" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="120" x2="400" y2="120" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="80" x2="400" y2="80" stroke="#e5e7eb" strokeWidth="1" />
            <line x1="0" y1="40" x2="400" y2="40" stroke="#e5e7eb" strokeWidth="1" />
            
            {/* Area */}
            <path 
              d={areaPath}
              fill="rgba(99, 102, 241, 0.1)" 
            />
            
            {/* Line */}
            <path 
              d={linePath}
              fill="none" 
              stroke="#6366f1" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            
            {/* Data points */}
            {points.map((point, i) => (
              <circle 
                key={i} 
                cx={point.x} 
                cy={point.y} 
                r={i === 2 ? 4 : 3} // Make the APR point (3rd point) bigger
                fill={i === 2 ? "#6366f1" : "white"} 
                stroke="#6366f1"
                strokeWidth="2"
              />
            ))}
            
            {/* APR label */}
            <g transform={`translate(${points[2].x}, ${points[2].y - 20})`}>
              <rect x="-15" y="-15" width="30" height="20" rx="4" fill="#6366f1" />
              <text x="0" y="-2" fontSize="10" fill="white" textAnchor="middle">APR</text>
            </g>
            
            {/* X-axis labels */}
            {chartData.map((d, i) => (
              <text 
                key={i}
                x={i * 50} 
                y="180" 
                fontSize="10" 
                fill="#9ca3af"
                textAnchor="middle"
              >
                {d.day}
              </text>
            ))}
          </svg>
        </div>
      </div>
    );
  }