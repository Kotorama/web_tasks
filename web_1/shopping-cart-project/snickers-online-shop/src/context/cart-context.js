import React, { createContext } from 'react'
import { useState } from 'react';
import productsData from '../products.json'

export const CartContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  productsData.map((item) => {
    cart[item.id] = 0;
  });
  // for (let i = 1; i < Products.length; i++) {
  //   cart[i] = 0;
  // }
  return cart;
}

export const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  };
  const removeAll = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }))
  };

  const contextValue = { cartItems, addToCart, removeFromCart, removeAll };


  console.log(cartItems)
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  )
}
