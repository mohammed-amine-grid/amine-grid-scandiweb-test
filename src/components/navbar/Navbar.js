import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import navlogo from "./a-logo.svg";
import cartlogo from "./cart.svg";
import CurrencyDropdownmenu from "./CurrencyDropdownmenu";

const NavbarContainer = styled("nav")(({ theme }) => ({
  width: "100vw",
  fontFamily: `${theme.fonts.primary}`,
  fontWeight: `${theme.fontWeights.regular}`,
  textTransform: "uppercase",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "16px",
  height: "80px",
  color: `${theme.colors.primary}`,
  paddingInline: "117px",
  display: "flex",

  ".nav-logo": {
    height: "32px",
    width: "28px",
  },
}));

const NavCategories = styled("ul")(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "start",
  li: {
    listStyle: "none",
    "& a": {
      paddingInline: "32px",
      paddingBottom: "32px",
      textDecoration: "none",
      color: "inherit",
      ":hover": {
        color: `${theme.colors.accent}`,
        borderBottom: `1px solid ${theme.colors.accent}`,
        // fontWeight:`${theme.fontWeights.semibold}`,
        // changing fontWeight moves the list itmes and I don't think setting a fixed width is a good idea , so I'm faking the bold effect by using text-shadow.
        textShadow: "0 0 1.5px",
      },
    },
  },
}));

const NavActions = styled("ul")({
  display: "flex",
  width: "100%",
  position:'relative',
  justifyContent: "flex-end",
  "cart-logo": {
    width: "20px",
    height: "13px",
  },
});

const CartIconItmesNumber = styled("div")({
  color: "white",
  backgroundColor:'black',
  textAlign:'center',
  width: "1.2rem",
  height: "1.2rem",
  position: "absolute",
  borderRadius:'50%',
  bottom: 9,
  right: -12,
  fontSize:'14px',
  fontWeight:'600'
});

export default class Navbar extends Component {
  render() {
    return (
      <NavbarContainer>
        <NavCategories>
          <li>
            <Link to="/women-products">Women</Link>
          </li>

          <li>
            <Link to="/men-products">Men</Link>
          </li>
          <li>
            <Link to="/kids-products">Kids</Link>
          </li>
        </NavCategories>
        <img className="nav-log" src={navlogo} alt="nav-logo" />
        <NavActions className="actions">
          <CurrencyDropdownmenu />
          <img className="cart-logo" src={cartlogo} alt="cart-logo" />
          <CartIconItmesNumber>3</CartIconItmesNumber>
        </NavActions>
      </NavbarContainer>
    );
  }
}
