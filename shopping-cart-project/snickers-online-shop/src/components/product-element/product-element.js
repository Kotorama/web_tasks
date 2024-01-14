import React from 'react'
import image from './assets/1.jpg'

const ProductElement = (props) => {
  const { id, title, price, imageSrc, brand } = props.data;
  return (
    <div>
      <img src={`/static/media/${imageSrc}`} alt='KillMe' />
      <img src={image} />
    </div> 
  )
}

export default ProductElement
