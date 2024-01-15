import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../../context/cart-context';
import './cart.css';

export const CartItem = (props) => {
  const { id, title, price, imageSrc, brand } = props.data;
  const { addToCart, removeFromCart, cartItems } = useContext(CartContext);
  return (
    <div className='cart-item'>
      <div>
        <img className='cart-image' src={imageSrc} />
      </div>
      <div className='info'>
        <div className='item-title'>{title}</div>
        <div className='price'>{cartItems[id] > 1 && <>({cartItems[id]})</>}{price * cartItems[id]} UAH</div>
      </div>
      <div className='buttons'>
        <button className='add-button' onClick={() => addToCart(id)}>Add</button>
        <button className='remove-button' onClick={() => removeFromCart(id)}>Remove</button>
      </div>
    </div>
  )
}
