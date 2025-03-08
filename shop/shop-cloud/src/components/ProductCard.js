'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };
  
  return (
    <Link href={`/product/${product.id}`} passHref>
      <motion.div 
        className="cursor-pointer group"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative mb-2">
          <img
            src={product.image || "/images/products/sigma-1.jpg"}
            alt={product.name}
            className="w-full h-96 object-cover bg-gray-100"
          />
          <motion.button 
            className="absolute top-2 right-2 text-2xl"
            onClick={toggleLike}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            {isLiked ? '❤️' : '♡'}
          </motion.button>
        </div>
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-gray-700">${product.price} {product.currency}</p>
      </motion.div>
    </Link>
  );
};

export default ProductCard; 