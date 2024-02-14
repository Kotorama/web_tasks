import React, { useContext } from 'react'
import ReactImageGallery from 'react-image-gallery';
import './index.css'
import { CartContext } from '../../context/cart-context'

const ProductElement = (props) => {
  const { id, title, price, imageSrc, brand, gallery } = props.data;
  const { addToCart, cartItems } = useContext(CartContext);
  const cartItemsAmount = cartItems[id];

  return (
    <div className='product-element-box'>
      <div className='gallery-wrapper'>
        <ReactImageGallery items={gallery} originalHeight={600} />
      </div>
      <div className='product-description'>
        Title: {title} <br />
        Brand: {brand} <br />
        Cost: {price} <br />
        <button className='shop-button product-page-button' onClick={() => addToCart(id)}>Add to cart {cartItemsAmount > 0 && <>({cartItemsAmount})</>}</button>
      </div>
    </div>
  )
}

export default ProductElement
