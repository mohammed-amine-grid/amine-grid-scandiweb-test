import React, { Component } from "react";
import styled from "@emotion/styled";
import product from "../product.jpg";

const CartItemContainer = styled("div")({
  display: "flex",
  marginBottom: "40px",
  h4: {
    fontWeight: "300",
  },
});

const CartItemAttributesContainer = styled("div")({
  diplay: "flex",
  flex: "1",
  "& *": {
    marginBottom: "7px",
  },
});

const CartItemPrice = styled("span")({
  display: "block",
  fontWeight: "600",
});

const CartItemSize = styled("span")({
  display: "inline-block",
  fontWeight: "400",
  fontSize: "14px",
  textAlign: "center",
  width: "24px",
  height: "24px",
  border: "1px solid black",
  marginRight: "8px",
  padding: "4px",
  cursor: "pointer",
  "&: hover": {
    backgroundColor: "black",
    color: "#fff",
  },
});

const CartItemColor = styled("span")(
  {
    display: "inline-block",
    width: "20px",
    height: "20px",
    marginRight: "10px",
    cursor: "pointer",
    "&: hover": {
      outline: "2px solid #5ECE7B",
      outlineOffset: "1px",
    },
  },
  (props) => ({
    backgroundColor: `${props.color}`,
  })
);

const CartItemImageContainer = styled("div")({
  display: "flex",
  flex: "1",
  img: {
    display: "block",
    minHeight: "190px",
    minWidth: "121px",
    maxHeight: "100%",
    maxWidth: "100%",
    flex: "1",
    flexGrow: "1",
  },
});

const CartItemQuantity = styled("div")({
  display: "flex",
  marginRight: "8px",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  button: {
    outline: "0",
    height: "24px",
    width: "24px",
    diplay: "block",
    padding: "4px",
    border: "1px solid black",
    background: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    "&: hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  span: {
    display: "block",
    fontSize: "16px",
    fontWeight: "600",
  },
  "& :last-child": {
    lineHeight: "0",
  },
});

export default class CartItem extends Component {
  render() {
    return (
      <CartItemContainer>
        <CartItemAttributesContainer>
          <div>
            <h4>Apollo Running Short</h4>
            <CartItemPrice>$50.00</CartItemPrice>
          </div>
          <div>
            <h4>Size</h4>
            <CartItemSize>M</CartItemSize>
            <CartItemSize>L</CartItemSize>
          </div>

          <div>
            <h4>Color</h4>
            <CartItemColor color="red" />
            <CartItemColor color="green" />
            <CartItemColor color="orange" />
            <CartItemColor color="blue" />
            <CartItemColor color="pink" />
          </div>
        </CartItemAttributesContainer>
        <CartItemImageContainer>
          <CartItemQuantity>
            <button>+</button>
            <span>2</span>
            <button>-</button>
          </CartItemQuantity>
          <img alt="src" src={product} />
        </CartItemImageContainer>
      </CartItemContainer>
    );
  }
}
