import React, { Component } from "react";
import styled from "@emotion/styled/macro";
import cartIcon from "../svg/circle-cart-icon.svg";
import { Link } from "react-router-dom";
import { getPrice } from "../utils/price";
import { connect } from "react-redux";
import getProduct from "../graphql/queries/getProductDetails";
import { addProductToCart } from "../app/actions/cart";
import { getDefaultAttributes } from "../utils/attributes";
import { formatNewId } from "../utils/formatNewId";

//Styling, Component at  ≈ 95

const CardImg = styled("img")({
  display: "block",
  width: "354px",
  height: "330px",
  marginBottom: "24px",
  boxShadow: "0px 1px 10px rgba(168, 172, 176, 0.19)",
});

const CardText = styled("div")({
  fontSize: "18px",
  "& > *": {
    padding: "5px",
  },
  "p:first-of-type": {
    fontWeight: "300",
  },
  "p:last-of-type": {
    fontWeight: "500",
  },
});

const AddToCartIcon = styled("img")({
  width: "52px",
  heigth: "52px",
  position: "absolute",
  bottom: "70px",
  right: "20px",
  opacity: "0",
});

const Card = styled("div")(
  {
    width: "386px",
    height: "444px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    cursor: "pointer",
    a: {
      textDecoration: "none",
      color: "inherit",
    },
    ":hover": {
      boxShadow: "0px 4px 35px rgba(168, 172, 176, 0.19)",
      [AddToCartIcon]: {
        opacity: "1",
        transition: "0.5s",
        ":hover": {
          transform: "scale(1.3)",
        },
      },
    },
  },
  ({ inStock }) =>
    !inStock && {
      boxShadow: "rgba(255,255,255,0.7) 0 0 0 429px inset",
      [CardImg]: {
        zIndex: "-1",
        position: "relative",
      },
      [CardText]: {
        opacity: "0.22",
      },
      ":hover": {
        boxShadow: "rgba(255,255,255,0.7) 0 0 0 429px inset",
      },
    }
);

const OutOfStock = styled("p")({
  textTransform: "uppercase",
  color: "#8D8F9A",
  fontWeight: "400",
  fontSize: "24px",
  position: "absolute",
  top: "35%",
  left: "25%",
  zIndex: "99",
});

class ProductListingCard extends Component {
  quickShop(event, id) {
    event.preventDefault();
    // get product details
    getProduct(id)
      .then(({ product }) => {
        const defaultAttrs = getDefaultAttributes(product.attributes);
        const newId = formatNewId(product, defaultAttrs);

        let addedProduct = {
          ...product,
          id: newId,
          selectedAttrs: defaultAttrs,
          quantity: 1,
        };

        this.props.addProductToCart(addedProduct);
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { selectedCurrency } = this.props;
    const { brand, name, prices, inStock, gallery, id } = this.props;
    const price = getPrice(selectedCurrency, prices);
    return (
      <Card inStock={inStock}>
        <Link to={`/product/${id}`}>
          <CardImg src={gallery[0]} />
          {inStock && (
            <AddToCartIcon
              onClick={(e) => this.quickShop(e, id)}
              alt="add-to-cart-button"
              src={cartIcon}
            />
          )}
          {!inStock && <OutOfStock>Out of stock</OutOfStock>}
          <CardText>
            <p>{brand + " " + name}</p>
            <p>{selectedCurrency.symbol + " " + price}</p>
          </CardText>
        </Link>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCurrency: state.currency.selectedCurrency,
  };
};

export default connect(mapStateToProps, { addProductToCart })(
  ProductListingCard
);
