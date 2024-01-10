import './App.css';
import Product from './Component/Product';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetails from './Component/ProductDetails';
import Header from './Component/Header';

import { Provider } from 'react-redux';
import store from './Redux/store';
import Cart from './Component/Cart';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Product />} />
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
