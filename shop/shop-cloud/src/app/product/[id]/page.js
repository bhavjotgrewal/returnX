'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '../../../context/CartContext';

// Sample product data - ideally this would come from an API or database
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


// API base URL - change this when deploying
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');
  const [composition, setComposition] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Find the basic product by ID - convert params.id to a number
  const product = productsData.find(p => p.id === Number(params.id));
  
  // Fetch product description from API
  useEffect(() => {
    if (params.id) {
      setLoading(true);
      fetch(`${API_URL}/api/products/${params.id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Product not found');
          }
          return response.json();
        })
        .then(data => {
          setDescription(data.description || '');
          setComposition(data.composition || '');
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          setLoading(false);
        });
    }
  }, [params.id]);
  
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
          
          {description && (
            <div className="mb-6">
              <p className="text-gray-700 whitespace-pre-line">{description}</p>
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
          
          {composition && (
            <div className="mb-6">
              <p className="font-medium">Composition:</p>
              <p className="text-gray-700">{composition}</p>
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