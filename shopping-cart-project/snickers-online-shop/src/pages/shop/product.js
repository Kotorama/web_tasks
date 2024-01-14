import React, { useContext } from 'react'
import { CartContext } from '../../context/cart-context'
import { Link } from 'react-router-dom';

export const Product = (props) => {
  const { id, title, price, imageSrc, brand } = props.data;
  const { addToCart, cartItems } = useContext(CartContext);
  const cartItemsAmount = cartItems[id];
  return (
    <div className='product-card'>
      <div className='img-container'>
        <img src={imageSrc} />
      </div>
      <div className='bottom-bar'>
        <div className='info-box'>
          <Link to={`/products/${id}`} className='item-title' title={title}>{title}</Link>
          <div>{price} UAH</div>
        </div>
        <button onClick={() => addToCart(id)}>Add to cart {cartItemsAmount > 0 && <>({cartItemsAmount})</>}</button>
      </div>
    </div>
  )
}
