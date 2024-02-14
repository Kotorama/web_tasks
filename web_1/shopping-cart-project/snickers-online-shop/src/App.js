import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/navbar/navbar';
import { Cart } from './pages/cart/cart';
import { Shop } from './pages/shop/shop';
import { CartContextProvider } from './context/cart-context'
import MissingPage from './pages/404-page-not-found/404-page-not-found';
import productsData from './products.json'
import ProductPage from './pages/product-page/product-page';
import ImageGallery from "react-image-gallery";
import React from 'react';

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];


function App() {
  return (
    <div className="App">
      <CartContextProvider>
        <    >
          <Navbar />
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='gallery' element={<ImageGallery items={images} />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/missing-page" element={<MissingPage />} />
            <Route path="/products/:id" element={<ProductPage />} />

            <Route path='*' element={<MissingPage />} />
          </Routes>
        </Router>
      </CartContextProvider>
    </div>
  );
}

export default App;
