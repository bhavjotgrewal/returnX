'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <motion.div 
          className="text-6xl mb-6"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          ✓
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-4">Thank You For Your Purchase!</h1>
        
        <p className="text-gray-600 mb-8">
          Your order has been received and is being processed. You will receive an email confirmation shortly.
        </p>
        
        <p className="text-gray-600 mb-8">
          Order #: {Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
        </p>
        
        <div className="flex flex-col space-y-4">
          <Link href="/account">
            <motion.button
              className="bg-black text-white px-8 py-3 w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Orders
            </motion.button>
          </Link>
          
          <Link href="/">
            <motion.button
              className="border border-black px-8 py-3 w-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Shopping
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}