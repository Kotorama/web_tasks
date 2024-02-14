import React, { useContext } from 'react'
import { CartContext } from '../../context/cart-context'
import { Link } from 'react-router-dom';

export const Product = (props) => {
  const { id, title, price, imageSrc, brand } = props.data;
  const { addToCart, cartItems } = useContext(CartContext);
  const cartItemsAmount = cartItems[id];
  return (
    // <div className='product-card'>
    //   <div className='img-container'>
    //     <img className='preview-image' src={imageSrc} />
    //   </div>
    //   <div className='bottom-bar'>
    //     <div className='info-box'>
    //       <Link to={`/products/${id}`} className='item-title' title={title}>{title}</Link>
    //       <div>{price} UAH</div>
    //     </div>
    //     <button className='shop-button' onClick={() => addToCart(id)}>Add to cart {cartItemsAmount > 0 && <>({cartItemsAmount})</>}</button>
    //   </div>
    // </div>   
    <div className='product-card'>
      <img className='preview-image' src={imageSrc}>
      </img>
      <div className='sliding-footer'>
        <div className='product-title'>{title}</div>
        <div className='product-price'>{price} грн</div>
        <div className='size-chart'>40 | 41 | 42 | 43 | 44 | 45</div>
      </div>
    </div>
  )
}
