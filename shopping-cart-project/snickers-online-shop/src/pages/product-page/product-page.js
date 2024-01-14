import React from 'react'
import { useParams } from 'react-router-dom';
import productsData from '../../products.json'
import MissingPage from '../404-page-not-found/404-page-not-found';
import ProductElement from '../../components/product-element/product-element';

const ProductPage = () => {

  const { id } = useParams();

  const myProduct = productsData.find(product => product['id'] == id);

  if (myProduct) {
    return (
      <div className='title'>
        <ProductElement data={myProduct} />
      </div>
    )

  }
  else {
    return (
      <MissingPage />
    )
  };

}

export default ProductPage
