import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../../context/cart-context';
import { backspace } from 'phosphor-react'
import './cart.css'

export const CartItem = (props) => {
  const { id, title, price, imageSrc, brand } = props.data;
  const { addToCart, removeFromCart, cartItems } = useContext(CartContext);
  return (
    <div className='cart-item'>
      <div>
        <img src={imageSrc}></img>
      </div>
      <div className='info'>
        <div className='item-title'>{title}</div>
        <div className='price'>{cartItems[id] > 1 && <>({cartItems[id]})</>}{price * cartItems[id]} UAH</div>
      </div>
      <div className='buttons'>
        <button className='add-button'></button>
        <button className='remove-button'></button>
      </div>
    </div>
  )
}
