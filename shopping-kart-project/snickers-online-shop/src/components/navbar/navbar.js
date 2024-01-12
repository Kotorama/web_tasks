import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartSimple } from 'phosphor-react';
import './navbar.css';

export const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='links'>
        <Link to='/'> Shop </Link>
        <Link to='/cart'>
          <ShoppingCartSimple size={35} weight='bold' />
        </Link>
      </div>
      <div className='title'>ShopTitle</div>
      <div className='filler'></div>
    </div>
  );
};
