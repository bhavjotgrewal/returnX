'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <motion.div 
      className="relative h-screen mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gray-800 bg-opacity-20">
        <img
          src="/api/placeholder/1200/800"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-start p-12 text-white">
        <motion.h1 
          className="text-7xl font-bold mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          CLOUD
        </motion.h1>
        <motion.p 
          className="text-xl mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          COMFORT. DESIGN. INNOVATION.
        </motion.p>
        <motion.button
          className="bg-white text-black px-8 py-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          SHOP NOW
        </motion.button>
      </div>
    </motion.div>
  );
};

export default HeroSection;