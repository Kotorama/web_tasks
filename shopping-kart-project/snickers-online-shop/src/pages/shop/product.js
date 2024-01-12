import React from 'react'

export const Product = (props) => {
  const { id, title, price, imageSrc, brand } = props.data;
  return (
    <div className='product-card'>
      <div className='img-container'>
        <img src={imageSrc} />
      </div>
      <div className='bottom-bar'>
        <div className='info-box'>
          <div>{title}</div>
          <div>{price} UAH</div>
        </div>
        <button>Add to cart</button>
      </div>
    </div>
  )
}
