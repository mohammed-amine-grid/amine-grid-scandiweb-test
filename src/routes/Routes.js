import React, { Component } from 'react'
import { Routes, Route, Navigate, useParams} from 'react-router-dom';
// import ProductListing from '../pages/MenProducts';
import Cart from '../pages/Cart';
import styled from '@emotion/styled';
import ProductListing from '../pages/ProductListing';
import { withRouter } from './withRouter';
const PagesContainer = styled('div')({
  marginTop:'80px',
})

export default class MainRoutes extends Component {
  render() {
    return (
      <PagesContainer>

      <Routes>
        <Route path="/" element={<Navigate replace to='all' />} />
        <Route path="/*"  element={<ProductListing />} />
        {/* <Route path="men-products" element={<MenProducts />} />
        <Route path="kids-products" element={<KidsProducts />} /> */}

        <Route path="cart" element={<Cart />} />
      </Routes>
      </PagesContainer>
    )
  }
}
