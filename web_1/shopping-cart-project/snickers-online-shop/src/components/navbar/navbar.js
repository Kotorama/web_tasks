import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartSimple } from 'phosphor-react';
import './navbar.css';
import { CartContext } from '../../context/cart-context'




export const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  let total_values = 0;
  // for (let item in Object.values(cartItems)) {
  //   total_values = total_values, item
  // }

  total_values = Object.values(cartItems).reduce((accumulator, current) => {
    return accumulator + current
  }, 0);

  return (
    <div className='navbar'>
      <div className='links'>
        <Link to='/'> Shop </Link>
        <Link to='/cart'>
          <ShoppingCartSimple size={35} weight='bold' />
          {total_values > 0 && <>({total_values})</>}
        </Link>
      </div>
      <div className='title'>ShopTitle</div>
      <div className='filler'></div>
    </div>
  );
};
