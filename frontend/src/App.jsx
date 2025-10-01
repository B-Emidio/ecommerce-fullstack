import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Listing from './pages/Listing/Listing';
import CreateOrder from './pages/CreateOrder/CreateOrder';
import Orders from './pages/Orders/Orders';
import './App.css';
import Navigation from './components/Navigation/Navigation';

export default function App() {

return (
      <>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listagem" element={<Listing />} />
          <Route path="/compra/novo" element={<CreateOrder />} />
          <Route path="/compra" element={<Orders />} />
        </Routes>
      </>
    );
}