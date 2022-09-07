import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import navlogo from "../../imgs/a-logo.svg";
import cartlogo from "../../imgs/cart.svg";
import CurrencyDropdownmenu from "./CurrencyDropdownmenu";
import getProductCategories from "../../graphql/queries/getProductCategories";

const NavbarContainer = styled("nav")(({ theme }) => ({
  width: "100vw",
  position: "fixed",
  zIndex: "999",
  top: "0",
  backgroundColor: "white",
  fontFamily: `${theme.fonts.primary}`,
  paddingInline: "17px",
  fontWeight: `${theme.fontWeights.regular}`,
  textTransform: "uppercase",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "16px",
  height: "80px",
  color: `${theme.colors.primary}`,
  display: "flex",

  ".nav-logo": {
    height: "32px",
    width: "28px",
  },
  "@media (min-width:991px)": {
    paddingInline: "20px",
  },
  "@media (min-width:1199px)": {
    paddingInline: "70px",
  },
  "@media (min-width:1399px)": {
    paddingInline: "117px",
  },
}));

const CategoriesContainer = styled("ul") ({
  display: "flex",
  flex: "2.6",
  justifyContent: "start",
  
 
  "@media (min-width:991px)": {
    flex: "2.2",
    a: { paddingInline: "14px", paddingBottom: "24px" },
  },

  "@media (min-width:1199px)": {
    a: { paddingInline: "24px", paddingBottom: "28px" },
  },

  "@media (min-width:1399px)": {
    a: {
      paddingInline: "30px",
      paddingBottom: "32px",
    },
  },
});

const CategoryLink = styled('li')({
  listStyle: "none",
   a: {
    textDecoration: "none",
    color: "inherit",
    fontWeight: "600",
    paddingInline: "8px",
    paddingBottom: "20px",
    ":hover": {
      color: '#5ECE7B',
      borderBottom: '2px solid #5ECE7B',
      // changing fontWeight wiggles the list itmes and I don't think setting a fixed width is a good idea , so I'm faking the bold effect by using a text-shadow.
      textShadow: "0 0 1px",
    },
  },
   "@media (min-width:991px)": {
    a: { paddingInline: "14px", paddingBottom: "24px" },
  },

  "@media (min-width:1199px)": {
    a: { paddingInline: "24px", paddingBottom: "28px" },
  },

  "@media (min-width:1399px)": {
    a: {
      paddingInline: "30px",
      paddingBottom: "32px",
    },
  },
})


const NavActions = styled("ul")({
  display: "flex",
  width: "100%",
  position: "relative",
  paddingRight: "30px",
  justifyContent: "flex-end",
  "cart-logo": {
    width: "20px",
    height: "13px",
  },
  flex: "2",
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





export default class Navbar extends Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    getProductCategories().then((res) =>
      this.setState({
        categories: res,
      })
    );
  }
  render() {
    return (
      <NavbarContainer>
        <CategoriesContainer>
          {this.state.categories && this.state.categories.map((category) => (
            <CategoryLink key={category.name}>
              <Link to={`/category/${category.name}`}>{category.name}</Link>
            </CategoryLink>
          ))}
        </CategoriesContainer>
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

// decouple cart overlay from navbar
