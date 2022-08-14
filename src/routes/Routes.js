import React, { Component } from 'react'
import { Routes, Route, Navigate} from 'react-router-dom';
import MenProducts from '../pages/MenProducts';
import WomenProducts from '../pages/WomenProducts';
import KidsProducts from '../pages/KidsProducst';
import Cart from '../pages/Cart';


export default class MainRoutes extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to='women-products' />} />
        <Route path="women-products" element={<WomenProducts />} />
        <Route path="men-products" element={<MenProducts />} />
        <Route path="kids-products" element={<KidsProducts />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    )
  }
}
