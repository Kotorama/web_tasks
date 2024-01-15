import React from 'react';
import './index.css';

const MissingPage = () => {
  return (
    <div className='ErrorMessage'>
      <div>
        Error 404: Page was found
      </div>
      <div>
        <img className='error-image' src='./images/ant.jpg' />
      </div>
    </div>
  )
}

export default MissingPage
