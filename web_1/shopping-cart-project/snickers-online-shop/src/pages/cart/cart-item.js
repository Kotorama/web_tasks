import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../../context/cart-context';
import './cart.css';

export const CartItem = (props) => {
  const { id, title, price, imageSrc, brand } = props.data;
  const { addToCart, removeFromCart, cartItems, removeAll } = useContext(CartContext);
  return (
    <div className='cart-item'>
      <div>
        <img className='cart-image' src={imageSrc} />
      </div>
      <div className='random-name-lol'>
        <div className='info'>
          <div>
            <div className='item-title'>{title}</div>
            <button className='remove-button-all' onClick={() => removeAll(id)}>X</button>
          </div>
          <div className='price'>{cartItems[id] > 1 && <>({cartItems[id]})</>}{price * cartItems[id]} UAH</div>


        </div>
        <div className='buttons'>
          <button className='add-button' onClick={() => addToCart(id)}>Add</button>
          <button className='remove-button' onClick={() => removeFromCart(id)}>Remove</button>
        </div>
      </div>
    </div>
  )
}
