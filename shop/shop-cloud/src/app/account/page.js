'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function Account() {
  const { orders } = useCart();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="bg-blue-50 rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 mr-2 text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <path d="M3.27 6.96L12 12.01l8.73-5.05"></path>
              <path d="M12 22.08V12"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-blue-400">MY ORDERS</h1>
        </div>
        
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg mb-4">You haven't placed any orders yet</p>
            <Link href="/">
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
              <div key={order.id} className="mb-8">
                {order.items.map(item => (
                  <motion.div 
                    key={item.id} 
                    className="flex mb-6 border-b pb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src="/api/placeholder/200/200"
                      alt={item.name}
                      className="w-32 h-32 object-cover bg-gray-100 mr-4"
                    />
                    
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-xl font-bold">{item.name}</h3>
                        <button className="text-gray-500">⋮</button>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">
                        The {item.name} are our best-selling {item.category}-style piece, made from a luxuriously soft and comfortable organic cotton with a weighty, high quality feel.
                      </p>
                      
                      <p className="text-sm text-gray-700 mb-4">
                        This style is a wardrobe essential and reliable daywear piece that you'll find yourself reaching for on a daily basis.
                      </p>
                      
                      <div className="mb-1">
                        <span className="font-medium">size: </span>
                        <span>{item.size || 'XS'}</span>
                      </div>
                      
                      <div className="mb-1">
                        <span className="font-medium">colour: </span>
                        <span>{item.selectedColor || 'burgundy'}</span>
                      </div>
                      
                      <div className="mb-1">
                        <span className="font-medium">compositions: </span>
                        <span>{item.composition || '95% organic certified cotton, 5% elastane'}</span>
                      </div>
                      
                      <p className="font-medium mt-2">${item.price} {item.currency}</p>
                    </div>
                  </motion.div>
                ))}
                
                <Link href={`/return/${order.id}`}>
                  <motion.button
                    className="text-sm border border-gray-300 px-4 py-1 rounded"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Return Items
                  </motion.button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}