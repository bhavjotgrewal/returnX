'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-10 border-b border-gray-200">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="w-8"></div> {/* Empty div for balanced spacing */}
        
        <Link href="/">
          <motion.div 
            className="text-2xl cursor-pointer" 
            whileHover={{ scale: 1.1 }}
          >
            ☂
          </motion.div>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <motion.div 
              className="relative cursor-pointer" 
              whileHover={{ scale: 1.1 }}
            >
              🛒
              {cart.length > 0 && (
                <motion.span 
                  className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {cart.length}
                </motion.span>
              )}
            </motion.div>
          </Link>
          
          <Link href="/account">
            <motion.div 
              className="cursor-pointer" 
              whileHover={{ scale: 1.1 }}
            >
              👤
            </motion.div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;