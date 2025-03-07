'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-10 border-b border-gray-200">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <motion.button 
          className="text-2xl"
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
        >
          ☰
        </motion.button>
        
        <Link href="/">
          <motion.div 
            className="text-2xl cursor-pointer" 
            whileHover={{ scale: 1.1 }}
          >
            ☂
          </motion.div>
        </Link>
        
        <div className="flex items-center">
          <form onSubmit={handleSearch} className="mr-4">
            <div className="relative">
              <motion.input 
                type="text" 
                placeholder="Search something..." 
                className="pl-10 pr-4 py-1 border rounded-full w-48"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                initial={{ width: '12rem' }}
                whileFocus={{ width: '16rem' }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="absolute left-3 top-2 text-gray-400"
                whileHover={{ scale: 1.1 }}
              >
                🔍
              </motion.span>
            </div>
          </form>
          
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-20 pt-16"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-8">
              <motion.button
                className="absolute top-4 right-4 text-2xl"
                onClick={toggleMenu}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
              
              <nav className="flex flex-col space-y-6 text-xl">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <motion.span 
                    className="block py-2 border-b border-gray-200"
                    whileHover={{ x: 10 }}
                  >
                    Home
                  </motion.span>
                </Link>
                <Link href="/category/new-arrivals" onClick={() => setIsMenuOpen(false)}>
                  <motion.span 
                    className="block py-2 border-b border-gray-200"
                    whileHover={{ x: 10 }}
                  >
                    New Arrivals
                  </motion.span>
                </Link>
                <Link href="/category/clothing" onClick={() => setIsMenuOpen(false)}>
                  <motion.span 
                    className="block py-2 border-b border-gray-200"
                    whileHover={{ x: 10 }}
                  >
                    Clothing
                  </motion.span>
                </Link>
                <Link href="/category/accessories" onClick={() => setIsMenuOpen(false)}>
                  <motion.span 
                    className="block py-2 border-b border-gray-200"
                    whileHover={{ x: 10 }}
                  >
                    Accessories
                  </motion.span>
                </Link>
                <Link href="/account" onClick={() => setIsMenuOpen(false)}>
                  <motion.span 
                    className="block py-2 border-b border-gray-200"
                    whileHover={{ x: 10 }}
                  >
                    My Account
                  </motion.span>
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;