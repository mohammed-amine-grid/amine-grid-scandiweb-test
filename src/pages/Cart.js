import styled from "@emotion/styled";
import React, { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../components/CartItem";
import { calculateTotal } from "../utils/price";

//Styling, Component at  ≈ 52

const CartPageContainer = styled("div")({
  maxWidth: "100vw",
  padding: "20px 70px",
  h2: {
    fontSize: "32px",
    fontWeight: "700",
    margin: "40px auto",
    textTransform: "uppercase",
  },
});

const CartPageOrderDetails = styled("div")({
  fontSize: "24px",
  "& > *": {
    marginBottom: "8px",
  },
  div: {
    width: "40%",
    display: "flex",
    span: {
      flex: 1,
    },
    "& :last-child": {
      fontWeight: "700",
    },
  },
  // "Total:"
  "& :last-child > :first-of-type": {
    fontWeight: "600",
  },
});

const CartPageOrderButton = styled("button")({
  border: "none",
  padding: "13px 115px",
  backgroundColor: "#5ECE7B",
  color: "white",
  fontSize: "14px",
  fontWeight: "500",
  marginTop: "16px",
  textTransform: "uppercase",
});

class Cart extends Component {
   
  calculateTax(percentage, total) {
    return (percentage * total) / 100;
  }

  render() {
    const { cartProductsList, quantity } = this.props.state;
    const { selectedCurrency } = this.props.currency;
    return (
      <CartPageContainer>
        <h2>Cart</h2>

        {cartProductsList.map((item) => (
          <CartItem cartpageDisplay key={item.id} {...item} />
        ))}

        <div>
          <CartPageOrderDetails>
            <div>
              <span>Tax 21%:</span>
              <span>
                {selectedCurrency.symbol +
                  " " +
                  this.calculateTax(
                    21,
                    calculateTotal(cartProductsList, selectedCurrency)
                  ).toFixed(2)}
              </span>
            </div>
            <div>
              <span>Quanity: </span>
              <span>{quantity}</span>
            </div>
            <div>
              <span>Total:</span>
              <span>
                {selectedCurrency.symbol +
                  " " +
                  calculateTotal(cartProductsList, selectedCurrency).toFixed(2)}
              </span>
            </div>
          </CartPageOrderDetails>
          <CartPageOrderButton>Order</CartPageOrderButton>
        </div>
      </CartPageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.cart,
    currency: state.currency,
  };
};

export default connect(mapStateToProps)(Cart);
