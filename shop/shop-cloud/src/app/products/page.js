'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/ProductCard';

// Sample product data - would typically come from an API
const productsData = [
  {
    "id": 1,
    "name": "Sigma Hoodie",
    "price": 100.99,
    "currency": "CAD",
    "image": "/images/products/hoodie-1.jpg",
    "category": "hoodies",
    "colors": ["burgundy", "black", "cream"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "description": "The Sigma hoodie features a unique abstract design, made from a luxuriously soft and comfortable organic cotton with a weighty, high quality feel.",
    "composition": "95% organic certified cotton, 5% elastane"
  },
  {
    "id": 2,
    "name": "Dorian Trousers",
    "price": 100.99,
    "currency": "CAD",
    "image": "/images/products/trousers-3.jpg",
    "category": "trousers",
    "colors": ["burgundy", "black", "olive"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "description": "The Dorian Trousers are our best-selling jogger-style trouser, made from a luxuriously soft and comfortable organic cotton with a weighty, high quality feel.\n\nThis style is a wardrobe essential and reliable daywear piece that you'll find yourself reaching for on a daily basis.",
    "composition": "95% organic certified cotton, 5% elastane"
  },
  {
    "id": 3,
    "name": "Cloud Tee",
    "price": 75.99,
    "currency": "CAD",
    "image": "/images/products/t-shirt-1.jpg",
    "category": "t-shirts",
    "colors": ["white", "black", "gray"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "description": "Our signature Cloud Tee features a minimal design with exceptional comfort. Made from 100% organic cotton, it's the perfect addition to any wardrobe.",
    "composition": "100% organic certified cotton"
  },
  {
    "id": 4,
    "name": "Drift Jacket",
    "price": 199.99,
    "currency": "CAD",
    "image": "/images/products/jacket-1.jpg",
    "category": "jackets",
    "colors": ["navy", "olive", "black"],
    "sizes": ["S", "M", "L", "XL"],
    "description": "The Drift Jacket is your perfect companion for unpredictable weather. Water-resistant, breathable, and stylish, it's as functional as it is fashionable.",
    "composition": "85% recycled polyester, 15% elastane"
  },
  {
    "id": 5,
    "name": "Echo Pants",
    "price": 125.99,
    "currency": "CAD",
    "image": "/images/products/trousers-2.jpg",
    "category": "trousers",
    "colors": ["black", "navy", "beige"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "description": "The Echo Pants combine comfort with a tailored look for versatile everyday wear. Features a relaxed fit with premium organic cotton blend.",
    "composition": "90% organic certified cotton, 10% elastane"
  },
  {
    "id": 6,
    "name": "Nimbus Sweater",
    "price": 149.99,
    "currency": "CAD",
    "image": "/images/products/sweater-1.jpg",
    "category": "sweaters",
    "colors": ["cream", "charcoal", "navy"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "description": "The Nimbus Sweater offers exceptional warmth without bulk. Crafted from sustainable wool blend, it's perfect for layering or as a standalone piece.",
    "composition": "70% recycled wool, 30% organic cotton"
  },
  {
    "id": 7,
    "name": "Rotman Hoodie",
    "price": 100.99,
    "currency": "CAD",
    "image": "/images/products/hoodie-2.jpg",
    "category": "hoodies",
    "colors": ["burgundy", "black", "cream"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "description": "The Rotman hoodie features a unique abstract design, made from a luxuriously soft and comfortable organic cotton with a weighty, high quality feel.",
    "composition": "95% organic certified cotton, 5% elastane"
  },
  {
    "id": 8,
    "name": "Elias Trousers",
    "price": 100.99,
    "currency": "CAD",
    "image": "/images/products/trousers-1.jpg",
    "category": "trousers",
    "colors": ["burgundy", "black", "olive"],
    "sizes": ["XS", "S", "M", "L", "XL"],
    "description": "The Elias Trousers are our best-selling jogger-style trouser, made from a luxuriously soft and comfortable organic cotton with a weighty, high quality feel.\n\nThis style is a wardrobe essential and reliable daywear piece that you'll find yourself reaching for on a daily basis.",
    "composition": "95% organic certified cotton, 5% elastane"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter product data based on active filter
  const filteredProducts = activeFilter === 'all' 
    ? productsData 
    : productsData.filter(product => product.category === activeFilter);
  
  // Categories for filter buttons
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'hoodies', label: 'Hoodies' },
    { id: 'trousers', label: 'Trousers' },
    { id: 't-shirts', label: 'T-Shirts' },
    { id: 'jackets', label: 'Jackets' },
    { id: 'sweaters', label: 'Sweaters' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        All Products
      </motion.h1>
      
      <motion.div 
        className="flex flex-wrap mb-8 justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {categories.map(category => (
          <motion.button
            key={category.id}
            className={`px-4 py-2 ${activeFilter === category.id ? 'bg-black text-white' : 'border hover:bg-gray-100'}`}
            onClick={() => setActiveFilter(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </motion.button>
        ))}
      </motion.div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <motion.div key={product.id} variants={item} layout>
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-full text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-gray-500">No products found in this category.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}