'use client';

import { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (product, size) => {
    setCart([...cart, { ...product, size, id: Date.now() }]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const checkout = () => {
    const newOrder = {
      id: Date.now(),
      items: [...cart],
      date: new Date().toISOString(),
      status: 'Processing'
    };
    setOrders([...orders, newOrder]);
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, checkout, orders, setOrders }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}