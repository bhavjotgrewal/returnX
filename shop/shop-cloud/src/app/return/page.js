'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '../../../context/CartContext';

export default function Return() {
  const params = useParams();
  const router = useRouter();
  const { orders } = useCart();
  const [reason, setReason] = useState('');
  
  // Find the order by ID
  const order = orders.find(o => o.id === Number(params.id));
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order Not Found</h1>
        <p className="mb-8">Sorry, we couldn't find the order you're looking for.</p>
        <button 
          className="bg-black text-white px-8 py-3"
          onClick={() => router.push('/account')}
        >
          Return to My Orders
        </button>
      </div>
    );
  }
  
  const handleReturn = () => {
    alert('Return initiated successfully');
    router.push('/account');
  };
  
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
              <path d="M22 12H2"></path>
              <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
              <line x1="6" y1="16" x2="6.01" y2="16"></line>
              <line x1="10" y1="16" x2="10.01" y2="16"></line>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-blue-400">RETURN</h1>
        </div>
        
        <div>
          {order.items.map(item => (
            <motion.div 
              key={item.id} 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex mb-4">
                <img
                  src="/api/placeholder/200/200"
                  alt={item.name}
                  className="w-32 h-32 object-cover bg-gray-100 mr-4"
                />
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold">{item.name}</h3>
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
              </div>
            </motion.div>
          ))}
          
          <div className="mt-10">
            <h3 className="text-lg font-medium mb-4">Why are you returning your purchase?</h3>
            <textarea
              className="w-full h-32 p-4 border border-gray-300 mb-6 rounded"
              placeholder="Type here..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
            
            <div className="text-center">
              <motion.button
                className="bg-red-300 text-white px-12 py-3 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReturn}
              >
                Return
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}