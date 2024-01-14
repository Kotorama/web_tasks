import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/navbar/navbar';
import { Cart } from './pages/cart/cart';
import { Shop } from './pages/shop/shop';
import { CartContextProvider } from './context/cart-context'

function App() {
  return (
    <div className="App">
      <CartContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Router>
      </CartContextProvider>
    </div>
  );
}

export default App;
