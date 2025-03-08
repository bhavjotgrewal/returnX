'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '../../../context/CartContext';

// Sample product data - ideally this would come from an API or database
const productsData = [
  {
    id: 1,
    name: 'Sigma',
    price: 100.99,
    currency: 'CAD',
    image: '/images/products/sigma-1.jpg',
    category: 'hoodies',
    sizes: ['XS', 'S', 'M', 'L', 'XL'], // Added sizes
    colors: ['Black', 'White', 'Gray'] // Added colors
  },
  {
    id: 2,
    name: 'Sigma',
    price: 100.99,
    currency: 'CAD',
    image: '/images/products/sigma-1.jpg',
    category: 'hoodies',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Gray']
  },
  {
    id: 3,
    name: 'Sasha Trousers',
    price: 100.99,
    currency: 'CAD',
    image: '/images/products/sigma-1.jpg',
    category: 'trousers',
    description: 'The Sasha Trousers are our best-selling jogger-style trouser, made from a luxuriously soft and comfortable organic cotton with a weighty, high quality feel.',
    composition: '95% organic certified cotton, 5% elastane',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy']
  },
  {
    id: 4,
    name: 'Sasha Trousers',
    price: 100.99,
    currency: 'CAD',
    image: '/images/products/sigma-1.jpg',
    category: 'trousers',
    description: 'The Sasha Trousers are our best-selling jogger-style trouser, made from a luxuriously soft and comfortable organic cotton with a weighty, high quality feel.',
    composition: '95% organic certified cotton, 5% elastane',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy']
  }
];

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  // Find the product by ID - convert params.id to a number
  const product = productsData.find(p => p.id === Number(params.id));
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
        <button 
          className="bg-black text-white px-8 py-3"
          onClick={() => router.push('/')}
        >
          Return to Home
        </button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart({
      ...product,
      selectedColor: selectedColor || product.colors?.[0],
      quantity
    }, selectedSize);
    
    router.push('/cart');
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={product.image || "/images/products/sigma-1.jpg"}
              alt={product.name}
              className="w-full h-auto object-cover bg-gray-100"
            />
          </motion.div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl mb-6">${product.price} {product.currency}</p>
          
          {product.description && (
            <div className="mb-6">
              <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
            </div>
          )}
          
          {product.sizes && (
            <div className="mb-6">
              <p className="font-medium mb-2">Size:</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <motion.button
                    key={size}
                    className={`px-4 py-2 border ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
                    onClick={() => setSelectedSize(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
          
          {product.colors && (
            <div className="mb-6">
              <p className="font-medium mb-2">Color:</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <motion.button
                    key={color}
                    className={`px-4 py-2 border ${selectedColor === color ? 'bg-black text-white' : 'bg-white text-black'}`}
                    onClick={() => setSelectedColor(color)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {color}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
          
          {product.composition && (
            <div className="mb-6">
              <p className="font-medium">Composition:</p>
              <p className="text-gray-700">{product.composition}</p>
            </div>
          )}

          <div className="mb-6">
            <p className="font-medium mb-2">Quantity:</p>
            <div className="flex items-center">
              <motion.button
                className="w-10 h-10 border border-gray-300 flex items-center justify-center"
                onClick={decrementQuantity}
                whileTap={{ scale: 0.9 }}
              >
                -
              </motion.button>
              <span className="w-12 text-center">{quantity}</span>
              <motion.button
                className="w-10 h-10 border border-gray-300 flex items-center justify-center"
                onClick={incrementQuantity}
                whileTap={{ scale: 0.9 }}
              >
                +
              </motion.button>
            </div>
          </div>
          
          <motion.button
            className="w-full bg-black text-white py-3 mt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
} 