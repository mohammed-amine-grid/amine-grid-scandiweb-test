import React, { Component } from 'react'
import { Routes, Route, Navigate} from 'react-router-dom';
// import ProductListing from '../pages/MenProducts';
import Cart from '../pages/Cart';
import styled from '@emotion/styled';
import ProductListing from '../pages/ProductListing';
import ProductDetails from '../pages/ProductDetails';
const PagesContainer = styled('div')({
  marginTop:'80px',
})

export default class MainRoutes extends Component {
  render() {
    return (
      <PagesContainer>
        
      <Routes>
        <Route path="/" element={<Navigate replace to='/category/all' />} />
        <Route path="/category/*"  element={<ProductListing />} />
        <Route path="product/*"  element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />

      </Routes>
      </PagesContainer>
    )
  }
}
