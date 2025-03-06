export function ReturnStats({ stats }) {
    // Format numbers appropriately
    const formatValue = (value, type) => {
      if (type === 'currency') {
        return `${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      } else if (type === 'number' && value >= 1000) {
        return `${(value / 1000).toFixed(0)}k`;
      } else {
        return value.toLocaleString();
      }
    };
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">Available Balance</span>
            <span className="text-2xl font-bold">{formatValue(stats.availableBalance.value, 'currency')}</span>
            <div className={`flex items-center text-xs ${stats.availableBalance.isPositive ? 'text-green-500' : 'text-red-500'} mt-1`}>
              <span className="mr-1">{stats.availableBalance.isPositive ? '↑' : '↓'} {Math.abs(stats.availableBalance.change)}%</span>
              <span className="text-gray-500">{stats.availableBalance.label}</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">{stats.availableBalance.date}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">Today Revenue</span>
            <span className="text-2xl font-bold">{formatValue(stats.todayRevenue.value, 'currency')}</span>
            <div className={`flex items-center text-xs ${stats.todayRevenue.isPositive ? 'text-green-500' : 'text-red-500'} mt-1`}>
              <span className="mr-1">{stats.todayRevenue.isPositive ? '↑' : '↓'} {Math.abs(stats.todayRevenue.change)}%</span>
              <span className="text-gray-500">{stats.todayRevenue.label}</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">{stats.todayRevenue.orders} Orders</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">Daily Sessions</span>
            <span className="text-2xl font-bold">{formatValue(stats.dailySessions.value, 'number')}</span>
            <div className={`flex items-center text-xs ${stats.dailySessions.isPositive ? 'text-green-500' : 'text-red-500'} mt-1`}>
              <span className="mr-1">{stats.dailySessions.isPositive ? '↑' : '↓'} {Math.abs(stats.dailySessions.change)}%</span>
              <span className="text-gray-500">{stats.dailySessions.label}</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">{stats.dailySessions.visitors} Visitors</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Returns</span>
            <span className="text-2xl font-bold">{formatValue(stats.totalReturns.value, 'number')}</span>
            <div className={`flex items-center text-xs ${stats.totalReturns.isPositive ? 'text-green-500' : 'text-red-500'} mt-1`}>
              <span className="mr-1">{stats.totalReturns.isPositive ? '↑' : '↓'} {Math.abs(stats.totalReturns.change)}%</span>
              <span className="text-gray-500">{stats.totalReturns.label}</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">${stats.totalReturns.avgReturn} of Average Return</span>
          </div>
        </div>
      </div>
    );
  }