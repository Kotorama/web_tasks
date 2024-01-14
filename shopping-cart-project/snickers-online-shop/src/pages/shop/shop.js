import React from 'react'
import ProductsData from '../../products.json'
import { Product } from './product';
import './shop.css'

export const Shop = () => {
  return (
    <div className='shop'>
      <div className='shop-title'>
      </div>
      <div className='products'>{ProductsData.map((product) => (
        <div>
          <Product data={product} />
        </div>
      ))}
      </div>
    </div>
  );
};