'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';

// Sample product data
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
  }
];

export default function Home() {
  return (
    <>
      <HeroSection />

      <motion.div 
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="relative mb-16">
          <h2 className="text-9xl font-bold text-right text-gray-100 absolute bottom-0 right-0 -z-10">NEW</h2>
          <h2 className="text-5xl font-bold mb-4 text-right text-purple-200">DROPS</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productsData.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/products">
            <motion.button
              className="bg-black text-white px-8 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        className="container mx-auto px-4 py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Our Collections</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/products">
            <motion.div 
              className="relative h-96 bg-gray-200 overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/images/collections/winter-collection.jpg"
                alt="Winter Collection"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white">Winter Collection</h3>
              </div>
            </motion.div>
          </Link>

          <Link href="/products">
            <motion.div 
              className="relative h-96 bg-gray-200 overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src="/images/collections/spring-collection.jpg"
                alt="Spring Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white">Spring Preview</h3>
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </>
  );
}