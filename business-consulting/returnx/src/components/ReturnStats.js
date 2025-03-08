'use client';

export function ReturnStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}

function StatCard({ title, value, subValue, change, isPositive, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {subValue && <p className="text-xs text-gray-500 mt-1">{subValue}</p>}
        </div>
        {change && (
          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            isPositive ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'
          }`}>
            <span>{isPositive ? '↑' : '↓'} {change}</span>
          </div>
        )}
      </div>
    </div>
  );
}