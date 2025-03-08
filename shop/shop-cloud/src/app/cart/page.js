'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateCartItemQuantity, getCartTotal, checkout } = useCart();
  const router = useRouter();
  
  const handleCheckout = () => {
    checkout();
    router.push('/thank-you');
  };
  
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link href="/products">
            <motion.button
              className="bg-black text-white px-8 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <div className="mb-8">
            {cart.map(item => (
              <motion.div 
                key={item.cartItemId || item.id}
                className="flex items-center border-b py-4"
                variants={item}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover bg-gray-100 mr-4"
                />
                
                <div className="flex-grow">
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-gray-600">Size: {item.size}</p>
                  {item.selectedColor && (
                    <p className="text-gray-600">Color: {item.selectedColor}</p>
                  )}
                  
                  <div className="flex items-center mt-2">
                    <span className="mr-2">Quantity:</span>
                    <button 
                      className="w-8 h-8 border rounded-l flex items-center justify-center"
                      onClick={() => updateCartItemQuantity(item.cartItemId || item.id, (item.quantity || 1) - 1)}
                    >
                      -
                    </button>
                    <span className="w-8 h-8 border-t border-b flex items-center justify-center">
                      {item.quantity || 1}
                    </span>
                    <button 
                      className="w-8 h-8 border rounded-r flex items-center justify-center"
                      onClick={() => updateCartItemQuantity(item.cartItemId || item.id, (item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium">${((item.price * (item.quantity || 1)).toFixed(2))} {item.currency}</p>
                  <motion.button 
                    className="text-red-500 text-sm mt-2"
                    onClick={() => removeFromCart(item.cartItemId || item.id)}
                    whileHover={{ scale: 1.05 }}
                  >
                    Remove
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="flex justify-between items-center p-4 bg-gray-50 mb-8"
            variants={item}
          >
            <h2 className="text-xl font-bold">Total</h2>
            <p className="text-xl font-bold">${getCartTotal().toFixed(2)} CAD</p>
          </motion.div>
          
          <motion.div 
            className="flex justify-end space-x-4"
            variants={item}
          >
            <Link href="/products">
              <motion.button
                className="border border-black px-8 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
              </motion.button>
            </Link>
            
            <motion.button
              className="bg-black text-white px-8 py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
            >
              Checkout
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}