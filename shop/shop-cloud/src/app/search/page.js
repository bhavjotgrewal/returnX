'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard';

// Sample product data
const productsData = [
  {
    id: 1,
    name: 'Sigma',
    price: 100.99,
    currency: 'CAD',
    image: '/placeholder.jpg',
    category: 'hoodies',
    description: 'The Sigma hoodie features a unique abstract design, made from a luxuriously soft and comfortable organic cotton with a weighty, high quality feel.'
  },
  {
    id: 2,
    name: 'Sasha Trousers',
    price: 100.99,
    currency: 'CAD',
    image: '/placeholder.jpg',
    category: 'trousers',
    description: 'The Sasha Trousers are our best-selling jogger-style trouser, made from a luxuriously soft and comfortable organic cotton with a weighty, high quality feel.',
    composition: '95% organic certified cotton, 5% elastane'
  }
];

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get('q') || '';
  
  // Filter products based on search query
  const filteredProducts = productsData.filter(product => 
    product.name.toLowerCase().includes(q.toLowerCase()) ||
    product.category.toLowerCase().includes(q.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(q.toLowerCase()))
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results: {q}</h1>
      
      {filteredProducts.length === 0 ? (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-xl mb-4">No products found matching "{q}"</p>
          <Link href="/">
            <motion.button
              className="bg-black text-white px-8 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Return to Home
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}