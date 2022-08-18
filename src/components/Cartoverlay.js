import React, { Component } from "react";
import styled from "@emotion/styled";
import CartItem from "./CartItem";
const CartoverlayContainer = styled("div")({
  marginLeft: "20px",
  maxHeight: "677px",
  maxWidth: "325px",
  padding: "32px 16px",
  border: "1px solid black",
  scrollbarWidth: "thin",
  scrollbarColor: "#5ECE7B white",
  "::-webkit-scrollbar": {
    width: "6px",
  },

  "::-webkit-scrollbar-thumb": {
    background: "#5ECE7B",
  },
  overflowY: "scroll",
});

const CartoverlayHeader = styled("h3")({
  fontSize: "16px",
  fontWeight: "700",
  marginBottom: "32px",
  span: {
    fontWeight: "500",
  },
});

const CartoverlayPrice = styled("div")({
  display: "flex",
  marginBottom:'34px',
  justifyContent: "space-between",
  span: {
    display: "block",
    fontSize: "16px",
    fontWeight: "600",
  },
  "& :last-child": {
    fontWeight: "800",
  },
});

const CartActionsContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const CartActionsButton = styled("button")(
  {
    boxSizing: "border-box",
    width: "140px",
    height: "43px",
    padding: "16px 32px",
    background: "#FFF",
    color: "black",
    textTransform: "uppercase",
    border: "1px solid #1D1F22",
    display:'flex',
    justifyContent:'center',
    lineHeight:'100%',
    fontSize:'14px',
    fontWeight:'600',
    cursor:'pointer'
  },
  ({checkout}) => (checkout && {
    border:"none",
    background: "#5ECE7B",
    color: "#fff",
    padding: "16px 28px",
  })
);

export default class Cartoverlay extends Component {
  render() {
    return (
      <CartoverlayContainer>
        <CartoverlayHeader>
          My Bag, <span>3 items</span>
        </CartoverlayHeader>
        <CartItem />
        <CartItem />
        {/* <CartItem /> */}
        <CartoverlayPrice>
          <span>Total</span>
          <span>$200.00</span>
        </CartoverlayPrice>
        <CartActionsContainer>
          <CartActionsButton>View Bag</CartActionsButton>
          <CartActionsButton checkout>check out</CartActionsButton>
        </CartActionsContainer>
      </CartoverlayContainer>
    );
  }
}
