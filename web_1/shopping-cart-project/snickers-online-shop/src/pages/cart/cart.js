import React from 'react'
import productsData from '../../products.json'
import { CartContext } from '../../context/cart-context';
import { useContext } from 'react';
import { CartItem } from './cart-item'


export const Cart = () => {
  const { addToCart, removeFromCart, cartItems } = useContext(CartContext);
  return <div className='cart'>
    <div>
      <h1>Your cart</h1>
    </div>
    <div className='cart-grid'>
      {productsData.map((product) => {
        if (cartItems[product.id] > 0) {
          return <CartItem data={product} />
        }
      })}
    </div>
  </div>;
};
