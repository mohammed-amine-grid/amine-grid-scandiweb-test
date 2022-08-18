import styled from '@emotion/styled';
import React, { Component } from 'react'
import CartItem from '../components/CartItem';

const CartPageContainer = styled('div')({
  paddingInline:'100px'
})


export default class Cart extends Component {
  render() {
    return (
      <CartPageContainer>
        <CartItem cartpage />
      </CartPageContainer>
    )
  }
}
