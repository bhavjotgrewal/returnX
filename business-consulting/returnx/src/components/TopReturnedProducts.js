'use client';

export function TopReturnedProducts({ products }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm h-full">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Top Returned Products</h2>
      
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-start">
            <div className="text-lg font-medium text-indigo-600 mr-3">
              {index + 1}.
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-gray-800">{product.name}</h3>
              {product.details && (
                <p className="text-sm text-gray-500 mt-1">{product.details}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}