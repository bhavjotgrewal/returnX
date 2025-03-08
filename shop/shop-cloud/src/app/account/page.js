'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function Account() {
  const { orders } = useCart();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">My Orders</h1>
          
          {orders.length === 0 ? (
            <div className="text-center py-8 border-t border-gray-200">
              <p className="text-lg mb-4">You haven't placed any orders yet</p>
              <Link href="/products">
                <motion.button
                  className="bg-black text-white px-6 py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Shopping
                </motion.button>
              </Link>
            </div>
          ) : (
            <div>
              {orders.map(order => (
                <div key={order.id} className="mb-10 border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium">Order #{order.id.toString().slice(-6)}</h2>
                    <span className={`px-3 py-1 rounded text-sm ${
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Returned' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-500 mb-4">
                    Order date: {new Date(order.date).toLocaleDateString()}
                  </p>
                  
                  {order.status === 'Returned' && order.returnDate && (
                    <p className="text-gray-500 mb-4">
                      Return date: {new Date(order.returnDate).toLocaleDateString()}
                    </p>
                  )}
                  
                  {order.items.map(item => (
                    <motion.div 
                      key={item.id} 
                      className="flex mb-6 border-b border-gray-100 pb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover bg-gray-100 mr-4"
                      />
                      
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <p className="font-medium">${item.price} {item.currency}</p>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1 mb-2">
                          {item.description?.substring(0, 100)}
                          {item.description?.length > 100 ? '...' : ''}
                        </p>
                        
                        <div className="flex flex-wrap text-sm text-gray-600">
                          <div className="mr-6">
                            <span className="font-medium">Size: </span>
                            <span>{item.size || 'XS'}</span>
                          </div>
                          
                          {item.selectedColor && (
                            <div className="mr-6">
                              <span className="font-medium">Color: </span>
                              <span>{item.selectedColor}</span>
                            </div>
                          )}
                          
                          <div>
                            <span className="font-medium">Quantity: </span>
                            <span>{item.quantity || 1}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Total: ${order.total ? order.total.toFixed(2) : 'N/A'} CAD</p>
                    </div>
                    
                    {order.status !== 'Returned' && (
                      <Link href={`/return/${order.id}`}>
                        <motion.button
                          className="border border-black px-4 py-2 rounded text-sm hover:bg-black hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Return Items
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}