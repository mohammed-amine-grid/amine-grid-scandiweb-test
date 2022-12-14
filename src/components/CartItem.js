import React, { Component } from "react";
import styled from "@emotion/styled/macro";

import {
  ProductBrand,
  ProductName,
  ProductColor,
  Attribute,
  ProductPrice,
  AttrTitle,
} from "./ProductAttributes";
import { getPrice } from "../utils/price";
import { connect } from "react-redux";
import {
  incrementProduct,
  decrementProduct,
  changeAttribute,
} from "../app/actions/cart";
import caretLeft from "../svg/CaretLeft.svg";
import caretRight from "../svg/CaretRight.svg";

// styling, Component at ≈ 168
const CartItemContainer = styled("div")(
  {
    margin: "0",
    display: "flex",
    marginBottom: "40px",
  },
  ({ cartpageDisplay }) =>
    cartpageDisplay && {
      minHeight: "336px",
      borderWidth: "1px 0",
      borderStyle: "solid",
      borderColor: "#E5E5E5",
      paddingTop: "24px",
      paddingBottom: "24px",
      h5: {
        fontSize: "18px",
        fontFamily: "Roboto Condensed",
        fontWeight: "700",
      },
    }
);

const CartItemAttributesContainer = styled("div")(
  {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    justifyContent: "space-between",
    "& * > *": {
      marginTop: "4px",
    },
  },
  ({ cartpageDisplay }) =>
    cartpageDisplay && {
      [ProductBrand]: {
        fontSize: "30px",
        fontWeight: "600",
      },
      [ProductName]: {
        fontWeight: "400",
        fontSize: "30px",
      },
      [ProductPrice]: {
        fontSize: "24px",
        fontWeight: "700",
        marginTop: "20px",
      },
      [AttrTitle]: {
        fontWeight: "700",
        fontSize: "18px",
      },
      [AttrTitle]: {
        margin: "20px auto",
      },
      [Attribute]: {
        height: "45px",
        width: "63px",
        lineHeight: "40px",
        fontSize: "16px",
        letterSpacing: "0.05em",
      },
      [ProductColor]: {
        height: "32px",
        width: "32px",
      },
    }
);

const CartItemImageContainer = styled("div")(
  {
    display: "flex",
    flex: 1,
    position: "relative",
  },
  ({ cartpageDisplay }) =>
    cartpageDisplay && {
      justifyContent: "flex-end",
      [ItemImage]: {
        marginLeft: "24px",
        maxWidth: "200px",
      },
      [CartItemQuantity]: {
        fontSize: "24px",
        button: {
          height: "45px",
          width: "45px",
          fontSize: "30px",
          fontWeight: "300",
        },
      },
    }
);

const ItemImage = styled("img")({
  marginLeft: "8px",
  display: "block",
  alignSelf: "center",
  height: "auto",
  maxWidth: "121px",
});

const LeftArrow = styled("img")({
  position: "absolute",
  bottom: 10,
  right: 40,
  cursor: "pointer",
});

const RightArrow = styled(LeftArrow)({
  bottom: 10,
  right: 5,
});

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

class CartItem extends Component {
  cartpageDisplay = this.props.cartpageDisplay;
  state = { selectedImgSrc: this.props.gallery[0], selectedImgIndex: 0 };

  handleIncrement(id) {
    this.props.incrementProduct(id);
  }

  handleDecrement(id) {
    this.props.decrementProduct(id);
  }

  selectAttribute(productId, attrId, attrValue) {
    const newAttribute = { productId, attrId, attrValue };
    this.props.changeAttribute(newAttribute);
  }

  // ([], str, str) => Boolean
  // check if an attr is selected to use boolean value as props for styling
  attributeSelected(selectedAttrs, attrId, attrValue) {
    return selectedAttrs.some(
      (selectedAttr) =>
        selectedAttr.id === attrId && selectedAttr.value === attrValue
    );
  }

  handleChangeImg(gallery, order) {
    const lastImgIndex = gallery.length - 1;
    const currentIndex = this.state.selectedImgIndex;
    if (order === "next") {
      currentIndex === lastImgIndex
        ? this.setState({ selectedImgSrc: gallery[0], selectedImgIndex: 0 })
        : this.setState({
            selectedImgSrc: gallery[currentIndex + 1],
            selectedImgIndex: currentIndex + 1,
          });
    } else if (order === "previous") {
      currentIndex === 0
        ? this.setState({
            selectedImgSrc: gallery[lastImgIndex],
            selectedImgIndex: lastImgIndex,
          })
        : this.setState({
            selectedImgSrc: gallery[currentIndex - 1],
            selectedImgIndex: currentIndex - 1,
          });
    }
  }

  render() {
    const {
      id,
      brand,
      attributes,
      name,
      prices,
      gallery,
      selectedCurrency,
      quantity,
      selectedAttrs,
    } = this.props;

    const price = getPrice(selectedCurrency, prices);
    return (
      <CartItemContainer cartpageDisplay={this.cartpageDisplay}>
        <CartItemAttributesContainer cartpageDisplay={this.cartpageDisplay}>
          <div>
            <ProductBrand>{brand}</ProductBrand>
            <ProductName>{name}</ProductName>
            <ProductPrice>
              {selectedCurrency?.symbol + " " + price}
            </ProductPrice>
          </div>
          {/* iterate through product.attributes [] and render <AttrTitle> (id, i.e: "Size") && <Attribute> (value, i.e: "42") || <ProductColor> (if value is hex) */}
          {attributes.map((attr) => (
            <div key={attr.id}>
              <AttrTitle>{attr.id}:</AttrTitle>
              {attr.items.map((item) =>
                item.value[0] === "#" ? (
                  <ProductColor
                  cartpageDisplay={this.cartpageDisplay}
                    onClick={
                      this.cartpageDisplay
                        ? () => this.selectAttribute(id, attr.id, item.value)
                        : undefined
                    }
                    selected={this.attributeSelected(
                      selectedAttrs,
                      attr.id,
                      item.value
                    )}
                    key={item.id}
                    color={item.value}
                  />
                ) : (
                  <Attribute
                    cartpageDisplay={this.cartpageDisplay}
                    onClick={
                      this.cartpageDisplay
                        ? () => this.selectAttribute(id, attr.id, item.value)
                        : undefined
                    }
                    isColor={item.value[0] === "#"}
                    selected={this.attributeSelected(
                      selectedAttrs,
                      attr.id,
                      item.value
                    )}
                    key={item.id}
                  >
                    {item.value}
                  </Attribute>
                )
              )}
            </div>
          ))}
        </CartItemAttributesContainer>
        <CartItemImageContainer cartpageDisplay={this.cartpageDisplay}>
          <CartItemQuantity>
            <button onClick={() => this.handleIncrement(id)}>+</button>
            <span>{quantity}</span>
            <button onClick={() => this.handleDecrement(id)}>-</button>
          </CartItemQuantity>
          <ItemImage alt="product-image" src={this.state.selectedImgSrc} />
          {this.cartpageDisplay && gallery.length > 1 && (
            <>
              <LeftArrow
                onClick={() => this.handleChangeImg(gallery, "previous")}
                alt="left"
                src={caretLeft}
              />
              <RightArrow
                onClick={() => this.handleChangeImg(gallery, "next")}
                src={caretRight}
              />
            </>
          )}
        </CartItemImageContainer>
      </CartItemContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCurrency: state.currency.selectedCurrency,
  };
};

export default connect(mapStateToProps, {
  incrementProduct,
  decrementProduct,
  changeAttribute,
})(CartItem);
