'use client';

import { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load cart and orders from localStorage on client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      const savedOrders = localStorage.getItem('orders');
      
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save cart and orders to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [cart, orders]);

  const addToCart = (product, size) => {
    const quantity = product.quantity || 1;
    
    // Check if the product with same ID and size already exists in cart
    const existingItemIndex = cart.findIndex(
      item => item.id === product.id && item.size === size
    );

    if (existingItemIndex !== -1) {
      // If it exists, update the quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // Otherwise add as new item
      setCart([...cart, { 
        ...product, 
        size, 
        quantity, 
        cartItemId: Date.now() // Use a separate ID for cart items
      }]);
    }
  };

  const updateCartItemQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(cart.map(item => 
      item.cartItemId === cartItemId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeFromCart = (cartItemId) => {
    setCart(cart.filter(item => item.cartItemId !== cartItemId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const checkout = () => {
    if (cart.length === 0) return;
    
    const newOrder = {
      id: Date.now(),
      items: [...cart],
      date: new Date().toISOString(),
      status: 'Processing',
      total: getCartTotal()
    };
    
    setOrders([...orders, newOrder]);
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateCartItemQuantity,
      getCartTotal,
      checkout, 
      orders, 
      setOrders 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}