export function TopReturnedProducts({ products }) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-medium mb-4">Top Returned Products</h2>
        <ul className="space-y-3">
          {products.map((product) => (
            <li key={product.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md">
              <span className="w-6 text-gray-500">{product.id}</span>
              <span className="flex-1">{product.name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }