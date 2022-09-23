import styled from "@emotion/styled";
import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../components/CartItem";

const CartPageContainer = styled("div")({
  maxWidth:'100vw',
  padding: "20px 70px",
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


 class Cart extends Component {
  render() {
        const { cartProductsList, quantity } = this.props.state;

    return (
      <CartPageContainer>
        {cartProductsList.map((item) => (
              <CartItem cartpageDisplay key={item.id} {...item} />
            ))}
    

        <CartPageOrderContainer>

        <CartPageOrderDetails>
          <div>
            <span>Tax 21%:</span> <span>$42.00</span>
          </div>
          <div>
            <span>Quanity: </span>
            <span>{quantity}</span>
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

const mapStateToProps = (state) => {
  return {
       state: state.cart,
    currency: state.currency
  }
}

export default connect(mapStateToProps)(Cart)