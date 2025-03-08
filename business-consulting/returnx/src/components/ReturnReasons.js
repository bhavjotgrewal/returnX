'use client';

import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  Label
} from 'recharts';

export function ReturnReasons({ data }) {
  const COLORS = ['#4e8de7', '#9374c3', '#b86991', '#837bcf', '#595d82'];
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={13}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium text-sm">{payload[0].name}</p>
          <p className="text-google-blue text-sm">{`${payload[0].value} returns (${((payload[0].value / data.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%)`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend that includes percentage
  const renderLegend = (props) => {
    const { payload } = props;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <ul className="flex flex-col text-sm mt-2">
        {
          payload.map((entry, index) => {
            const percentage = ((entry.payload.value / total) * 100).toFixed(0);
            return (
              <li key={`item-${index}`} className="flex items-center mb-1">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-800">
                  {entry.value} ({percentage}%)
                </span>
              </li>
            )
          })
        }
      </ul>
    )
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm h-full google-card flex flex-col">
      <h2 className="text-lg font-medium text-gray-800 mb-2">Return Reasons</h2>
      
      <div className="flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="vertical" 
              verticalAlign="bottom" 
              align="center"
              content={renderLegend} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}