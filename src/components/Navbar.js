import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import navlogo from "../svg/a-logo.svg";
import CurrencyDropdownmenu from "./CurrencyDropdownmenu";
import getProductCategories from "../graphql/queries/getProductCategories";
import Cartoverlay from "./Cartoverlay";

//Styling, Component at  ≈ 104

const NavbarContainer = styled("nav")({
  width: "100%",
  position: "sticky",
  zIndex: "999",
  top: "0",
  backgroundColor: "white",
  paddingInline: "17px",
  fontWeight: "400",
  textTransform: "uppercase",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "16px",
  height: "80px",
  color: "#1D1F22",
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
});

const CategoriesContainer = styled("ul")({
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
      paddingBottom: "26px",
    },
  },
});

const CategoryLink = styled("li")({
  listStyle: "none",
  a: {
    marginRight:'5px',
    textDecoration: "none",
    color: "inherit",
    fontWeight: "600",
    paddingInline: "8px",
    paddingBottom: "20px",
    ":hover": {
      color: "#5ECE7B",
      borderBottom: "2px solid #5ECE7B",
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
      paddingBottom: "28px",
    },
  },
}, ({isActive}) => isActive && {
  color: "#5ECE7B",
      borderBottom: "2px solid #5ECE7B",
});

const NavActions = styled("ul")({
  display: "flex",
  width: "100%",
  position: "relative",
  paddingRight: "30px",
  justifyContent: "flex-end",
  flex: "2",
});

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      cartOverlayOpen: false,
    };
  }

  componentDidMount() {
    getProductCategories().then((res) =>
      this.setState({
        categories: res,
      })
    );
  }

  render() {
    const NavLinkisActive = {
      color: "#5ECE7B",
      borderBottom: "2px solid #5ECE7B",
    }
    return (
      <NavbarContainer>
        <CategoriesContainer>
          {this.state.categories &&
            this.state.categories.map((category) => (
              <CategoryLink key={category.name}>
                <NavLink
                  style={({ isActive }) =>
                    isActive ? NavLinkisActive : null
                  }
                  to={`/category/${category.name}`}
                >
                  {category.name}
                </NavLink>
              </CategoryLink>
            ))}
        </CategoriesContainer>
        <img className="nav-log" src={navlogo} alt="nav-logo" />
        <NavActions className="actions">
          <CurrencyDropdownmenu />

          <Cartoverlay />
        </NavActions>
      </NavbarContainer>
    );
  }
}
