import React from 'react'
import productsData from '../../products.json'
import { Product } from './product';
import './shop.css'

export const Shop = () => {
  return (
    <div className='shop'>
      <div className='shop-title'>
      </div>
      <div className='products'>{productsData.map((product) => (
        <div>
          <Product data={product} />
        </div>
      ))}
      </div>
    </div>
  );
};