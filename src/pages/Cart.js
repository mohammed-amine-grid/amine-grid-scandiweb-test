import styled from "@emotion/styled";
import React, { Component } from "react";
import CartItem from "../components/CartItem";

const CartPageContainer = styled("div")({
  paddingInline: "100px",
});

const CartPageOrderContainer = styled("div")({});

const CartPageOrderDetails = styled("div")({
  fontSize: "24px",
  "& > *": {
    marginBottom: "8px",
  },
  div: {
    width:'20%',
    display:'flex',
    "span":{
      flex:1
    },
    "& :last-child": {
      fontWeight:'700'
    },
  },
  // "Total:"
  "& :last-child > :first-child": {
    fontWeight:'600'
  }
});

const CartPageOrderButton = styled('button')({

  border:'none',
  padding:'13px 115px',
  backgroundColor:'#5ECE7B',
  color:"white",
  fontSize:'14px',
  fontWeight:'500',
  marginTop:'16px',
  textTransform:'uppercase'
 
})


export default class Cart extends Component {
  render() {
    return (
      <CartPageContainer>
        <CartItem cartpageDisplay />
        <CartPageOrderContainer>

        <CartPageOrderDetails>
          <div>
            <span>Tax 21%:</span> <span>$42.00</span>
          </div>
          <div>
            <span>Quanity: </span>
            <span>3</span>
          </div>
          <div>
            <span>Total:</span>
            <span>$200.00</span>
          </div>
        </CartPageOrderDetails>
          <CartPageOrderButton>Order</CartPageOrderButton>
        </CartPageOrderContainer>
      </CartPageContainer>
    );
  }
}
