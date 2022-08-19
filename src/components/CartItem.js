import React, { Component } from "react";
import styled from "@emotion/styled/macro";
import product from "../product.jpg";

const CartItemContainer = styled("div")(
  { 
    margin:'0',
    display: "flex",
    marginBottom: "40px",
    h5: {
      fontWeight: "300",
    },
  },
  ({ cartpageDisplay }) =>
    cartpageDisplay && {
      maxHeight: "336px",
      borderWidth: "1px 0",
      borderStyle: "solid",
      borderColor: "#E5E5E5",
      paddingTop: "24px",
      paddingBottom: "24px",
      h5:{
        fontSize:'18px',
        fontFamily:'Roboto Condensed',
        fontWeight:'700'
      }
    }
);

const CartItemAttributesContainer = styled("div")(
  {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    justifyContent: "space-between",
    "& * > *": {
      marginTop:'4px'
    },
  },
  ({ cartpageDisplay }) =>
  cartpageDisplay && {
    [CartItemBrand] : {
        fontSize:'30px',
        fontWeight:'600'
      },
      [CartItemName]: {
        fontWeight:'400',
        fontSize:'30px'
      },
      [CartItemPrice]: {
        fontSize: "24px",
        fontWeight: "700",
        marginTop:'20px',
      },
      [CartItemSize]: {
        height:'45px',
        width:'63px',
        textAlign:'center',
        lineHeight:'44px',
        fontSize:'16px',
        letterSpacing:'0.05em'
      },
    [CartItemColor]: {
      height:'32px',
      width:'32px',
    }
    }
);

const CartItemBrand = styled('h3')({
  fontSize:'16px',
  fontWeight:'300',
  display:'block'
})
const CartItemName = styled('h4')({...CartItemBrand});

const CartItemPrice = styled("span")({
  marginTop:'10px',
  display: "block",
  fontWeight: "600",
});

const CartItemSize = styled("span")({
  display: "inline-block",
  fontWeight: "600",
  fontSize: "14px",
  textAlign: "center",
  lineHeight:"160%",
  minWidth: "24px",
  minHeight: "24px",
  border: "1px solid black",
  marginRight: "8px",
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
  ({ color }) => ({
    backgroundColor: `${color}`,
  })
);

const CartItemImageContainer = styled("div")(
  {
    display: "flex",
    flex: "1",
    img: {
      marginLeft: "8px",
      display: "block",
      minHeight: "190px",
      minWidth: "121px",
      maxHeight: "100%",
      maxWidth: "100%",
    },
  },
  ({ cartpageDisplay }) =>
    cartpageDisplay && {
      justifyContent: "flex-end",
      "img": {
        marginLeft: "24px",
        minHeight: "288px",
        maxWidth: "200px",
      },
      [CartItemQuantity]: {
        fontSize: "24px",
        button :{
          height:'45px',
          width:'45px',
          fontSize:'30px',
          fontWeight:'300'
        }
      },
    }
);

const CartItemQuantity = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "16px",
  button: {
    outline: "0",
    height: "24px",
    width: "24px",
    diplay: "block",
    padding: "4px",
    border: "1px solid black",
    background: "#fff",
    cursor: "pointer",
    "&: hover": {
      backgroundColor: "black",
      color: "white",
    },
  },
  span: {
    display: "block",
    fontSize: "inherit",
    fontWeight: "600",
  },
  "& :last-child": {
    lineHeight: "0",
  },
});


export default class CartItem extends Component {
  cartpageDisplay = this.props.cartpageDisplay;
  render() {
    return (
      <CartItemContainer cartpageDisplay={this.cartpageDisplay}>
        <CartItemAttributesContainer cartpageDisplay={this.cartpageDisplay}>
          <div>
            <CartItemBrand>Apollo</CartItemBrand>
            <CartItemName>Running Shorts</CartItemName>
            <CartItemPrice>$50.00</CartItemPrice>
          </div>
          <div>
            <h5>Size:</h5>
            <CartItemSize>XS</CartItemSize>
            <CartItemSize>M</CartItemSize>
          </div>

          <div>
            <h5>Color:</h5>
            <CartItemColor color="red" />
            <CartItemColor color="green" />
            <CartItemColor color="orange" />
            <CartItemColor color="blue" />
          </div>
        </CartItemAttributesContainer>
        <CartItemImageContainer cartpageDisplay={this.cartpageDisplay}>
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
