import React, { Component } from "react";
import styled from "@emotion/styled";
import CartItem from "./CartItem";
import { connect } from "react-redux";
import cartlogo from "../svg/cart.svg";
import { calculateTotal } from "../utils/price";
import { Link } from "react-router-dom";

// Styling, Component at  ≈136

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
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  backgroundColor: "#393748",
  opacity: "22%",
});

const CartoverlayContainer = styled("div")({
  position: "fixed",
  top: 80,
  right: 72,
  marginLeft: "20px",
  maxHeight: "677px",
maxWidth: "325px",
  backgroundColor: "#fff",
  padding: "32px 16px",
  scrollbarWidth: "thin",
  scrollbarColor: "#5ECE7B white",
  "::-webkit-scrollbar": {
    width: "6px",
  },

  "::-webkit-scrollbar-thumb": {
    background: "#5ECE7B",
  },
  a: {
    textDecoration: "none",
  },
  overflowY: "scroll",
});

const CartoverlayHeader = styled("h3")({
  fontSize: "16px",
  marginBottom: "36px",
});

const CartoverlayHeaderLabel = styled("span")({
  fontWeight: "700",
});

const CartoverlayHeaderQuantity = styled("span")({
  fontWeight: "500",
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
 display:'grid',
 gridTemplateColumns:'1fr 1fr',
 gap:'12px'
});

const CartActionsButton = styled("button")(
  {
    width: "140px",
    height: "43px",
    padding: "16px 10px",
    background: "#FFF",
    color: "black",
    textTransform: "uppercase",
    border: "1px solid #1D1F22",
    lineHeight: "100%",
    fontSize: "14px",
    fontWeight: "600",
    transition: "0.2s ease-in",
    cursor: "pointer",
    "&: hover": {
      color: "white",
      background: "black",
    },
    // marginInline:"12px"
  },

  ({ checkout }) =>
    checkout && {
      border: "none",
      background: "#5ECE7B",
      color: "#fff",
      padding: "16px 28px",
      transition: "0.2s ease-in",
      "&: hover": {
        color: "#5ECE7B",
        background: "#fff",
        outline: "2px solid #5ECE7B",
      },
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
    if (
      this.overlayRef.current &&
      !this.overlayRef.current.contains(event.target)
    ) {
      this.setState({ overlayOpen: false });
    }
    return;
  }

  render() {
    const { cartProductsList, quantity } = this.props.state;
    const { selectedCurrency } = this.props.currency;
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

        {quantity !== 0 ? (
          <CartIconItmesNumber>{quantity}</CartIconItmesNumber>
        ) : null}

        {this.state.overlayOpen && (
          <CartoverlayContainer ref={this.overlayRef}>
            <CartoverlayHeader>
              <CartoverlayHeaderLabel>My Bag</CartoverlayHeaderLabel>,{" "}
              <CartoverlayHeaderQuantity>
                {quantity} items
              </CartoverlayHeaderQuantity>
            </CartoverlayHeader>
            {cartProductsList.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <CartoverlayPrice>
              <span>Total</span>
              <span>
                {selectedCurrency.symbol +
                  " " +
                  calculateTotal(cartProductsList, selectedCurrency).toFixed(2)}
              </span>
            </CartoverlayPrice>
            <CartActionsContainer>
              <Link onClick={() => this.setState({overlayOpen: false})} to="cart">
                <CartActionsButton>View Bag</CartActionsButton>
              </Link>
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
    currency: state.currency,
  };
};

export default connect(mapStateToProps)(Cartoverlay);
