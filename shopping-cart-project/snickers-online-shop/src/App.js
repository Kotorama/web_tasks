import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/navbar/navbar';
import { Cart } from './pages/cart/cart';
import { Shop } from './pages/shop/shop';
import { CartContextProvider } from './context/cart-context'
import MissingPage from './pages/404-page-not-found/404-page-not-found';
import productsData from './products.json'
import ProductPage from './pages/product-page/product-page';

function App() {
  return (
    <div className="App">
      <CartContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Shop />} />
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
