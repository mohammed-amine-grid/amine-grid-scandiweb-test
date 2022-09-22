import React, { Component } from "react";
import styled from "@emotion/styled";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import cartlogo from "../imgs/cart.svg";

const CartLogo = styled("img")({
  cursor: "pointer",
});

const CartIconItmesNumber = styled("div")({
  color: "white",
  backgroundColor: "black",
  textAlign: "center",
  width: "1.2rem",
  height: "1.2rem",
  position: "absolute",
  borderRadius: "50%",
  bottom: 9,
  right: 18,
  fontSize: "14px",
  fontWeight: "600",
});

const GreyOverlay = styled("div")({
  height: "100%",
  width: "100%",
  position: "fixed",
  top: 80,
  left:0,
  right:0,
  bottom:0,
  zIndex: -1,
  backgroundColor: "#393748",
  opacity: "22%",
});

const CartoverlayContainer = styled("div")({
  // top:'200px',
  position: "fixed",
  top: 80,
  right: 72,
  marginLeft: "20px",
  maxHeight: "677px",
  maxWidth: "325px",
  backgroundColor: "#fff",
  padding: "32px 16px",
  // border: "1px solid black",
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
  marginBottom: "34px",
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
    display: "flex",
    justifyContent: "center",
    lineHeight: "100%",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  ({ checkout }) =>
    checkout && {
      border: "none",
      background: "#5ECE7B",
      color: "#fff",
      padding: "16px 28px",
    }
);

class Cartoverlay extends Component {
  constructor(props) {
    super(props);
    this.overlayRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this); 
    this.state = {
      overlayOpen: false,
    };
  }

  componentDidMount() {

        document.addEventListener("mousedown", this.handleClickOutside);
        
  }

    handleClickOutside(event) {
      // console.log(this.overlayRef);
    if (this.overlayRef.current && !this.overlayRef.current.contains(event.target)) {
      this.setState({ overlayOpen: false });
    }
    return
  }



  render() {
    const { cartProductsList } = this.props.state;
    console.log(cartProductsList[0] || 'hehe');
    return (
      <>
        <CartLogo
          onClick={() =>
            this.setState({ overlayOpen: !this.state.overlayOpen })
          }
          src={cartlogo}
          alt="cart-logo"
        />
        {this.state.overlayOpen && <GreyOverlay />}

        {cartProductsList.length ? (
          <CartIconItmesNumber>{cartProductsList.length}</CartIconItmesNumber>
        ) : undefined}
        {this.state.overlayOpen && (
          <CartoverlayContainer ref={this.overlayRef}>
            <CartoverlayHeader>
              My Bag, <span>{cartProductsList.length}</span>
            </CartoverlayHeader>
            {cartProductsList.map(item =>  <CartItem {...item} />)}
            <CartoverlayPrice>
              <span>Total</span>
              <span>$200.00</span>
            </CartoverlayPrice>
            <CartActionsContainer>
              <CartActionsButton>View Bag</CartActionsButton>
              <CartActionsButton checkout>check out</CartActionsButton>
            </CartActionsContainer>
          </CartoverlayContainer>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.cart,
  };
};

export default connect(mapStateToProps)(Cartoverlay);
