import React from 'react'
import './index.css'
import image from './images/ant-meme.png'

const MissingPage = () => {
  return (
    <div className='ErrorMessage'>
      <div>
        Error 404: Page was found
      </div>
      <image className='error-image' src={image} />
    </div>
  )
}

export default MissingPage
