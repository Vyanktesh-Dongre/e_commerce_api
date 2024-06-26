
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import ManageProducts from './ManageProducts';
import AdminLogin from './AdminLogin';
import AddProducts from './AddProduct';
import EditProduct from './EditProduct';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/manage" element={<ManageProducts />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/" element={<AdminLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;




