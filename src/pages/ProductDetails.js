import React, { Component } from "react";
import styled from "@emotion/styled";
import parse from "html-react-parser";

import {
  ProductBrand,
  ProductName,
  ProductColor,
  Attribute,
  ProductPrice,
  AttrTitle,
} from "../components/ProductAttributes";
import getProduct from "../graphql/queries/getProductDetails";
import { withRouter } from "../routes/withRouter";
import { connect } from "react-redux";
import { getPrice } from "../utils/price";
import { compareAttrs, getDefaultAttributes } from "../utils/attributes";

import { addProductToCart } from "../app/actions/cart";
import { formatNewId } from "../utils/formatNewId";
import PDPImgCarousel from "../components/PDPImgCarousel";

// Styling, Component at  ≈100

const PDPContainer = styled("div")({
  display: "flex",
  width: "100vw",
  padding: "42px 97px",
  justifyContent: "center",
  "@media(max-height:930px)": {
    padding: "20px 97px",
  },
  "@media(max-width:1199px)": {
    flexWrap: "wrap",
  },
});

const ProductAttributesContainer = styled("div")({
  flexDirection: "column",
  paddingLeft: "100px",
  width: "100%",

  [ProductBrand]: {
    fontSize: "30px",
    fontWeight: "600",
  },
  [ProductName]: {
    fontSize: "30px",
    fontWeight: "400",
    marginBottom: "38px",
  },
  [AttrTitle]: {
    fontFamily: "Roboto Condensed",
  },
  [Attribute]: {
    width: "63px",
    height: "45px",
    fontSize: "16px",
    lineHeight: "39px",
    marginBottom: "24px",
  },
  [ProductColor]: {
    width: "32px",
    height: "32px",
    marginBottom: "32px",
  },
  [ProductPrice]: {
    fontSize: "24px",
    fontWeight: "700",
  },
});

const AddToCartButton = styled("button")(
  {
    marginTop: "20px",
    color: "#fff",
    border: "none",
    width: "287px",
    height: "52px",
    fontWeight: "600",
    fontSize: "16px",
    background: "#5ECE7B",
    textTransform: "uppercase",
    cursor: "pointer",
  },
  ({ inStock }) => ({
    opacity: `${!inStock ? 1 : 0.5}`
  })
);

const ProductDescription = styled("div")({
  fontFamily: "Raleway",
  fontSize: "18px",
  // width: "393px",
  lineHeight: "160%",
  marginTop: "40px",
});

class ProductDetails extends Component {
  state = {
    product: null,
  };
  componentDidMount() {
    this.fetchProductDetails();
  }

  fetchProductDetails() {
    getProduct(this.props.params["*"])
      .then(({ product }) => {
        const attrs = product?.attributes;

        this.setState({
          product: { ...product, selectedAttrs: getDefaultAttributes(attrs) },
        });
      })
      .catch((error) => console.log(error));
  }

  addToCart(product) {
    const newId = formatNewId(product);
    let addedProduct = { ...product, id: newId, quantity: 1 };
    this.props.addProductToCart(addedProduct);
  }

  selectAttribute(attribute) {
    const selectedAttrs = [...this.state.product.selectedAttrs];

    const newSelectedAttributes = selectedAttrs.map((attr) =>
      attr.id === attribute.id ? { ...attr, value: attribute.value } : attr
    );

    if (compareAttrs(selectedAttrs, newSelectedAttributes)) {
      return;
    }

    this.setState({
      product: {
        ...this.state.product,
        selectedAttrs: [...newSelectedAttributes],
      },
    });
  }

  // ([], str, str) => Boolean
  // check if an attr is selected to use boolean value as props for styling
  attributeSelected(selectedAttrs, attrId, attrValue) {
    return selectedAttrs.some(
      (selectedAttr) =>
        selectedAttr.id === attrId && selectedAttr.value === attrValue
    );
  }

  render() {
    const product = this.state.product;
    const { selectedCurrency } = this.props;
    const prices = product?.prices;
    const price = getPrice(selectedCurrency, prices);

    return (
      product && (
        <PDPContainer>
          <PDPImgCarousel gallery={product.gallery} />
          <ProductAttributesContainer>
            <div>
              <ProductBrand>{product.brand}</ProductBrand>
              <ProductName>{product.name}</ProductName>
            </div>
            {/* iterate through product.attributes [] and render <AttrTitle> (id, i.e: "Size") && <Attribute> (value, i.e: "42") || <ProductColor> (if value is hex) */}
            {product.attributes.map((attr) => (
              <div key={attr.id}>
                <AttrTitle>{attr.id}</AttrTitle>
                {attr.items.map((item) =>
                  item.value[0] === "#" ? (
                    <ProductColor
                      selected={this.attributeSelected(
                        product.selectedAttrs,
                        attr.id,
                        item.value
                      )}
                      onClick={() =>
                        this.selectAttribute({ id: attr.id, value: item.value })
                      }
                      key={item.id}
                      color={item.value}
                    />
                  ) : (
                    <Attribute
                      onClick={() =>
                        this.selectAttribute({ id: attr.id, value: item.value })
                      }
                      selected={this.attributeSelected(
                        product.selectedAttrs,
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

            <div>
              <AttrTitle>Price</AttrTitle>
              <ProductPrice>
                {selectedCurrency?.symbol + " " + price}
              </ProductPrice>
            </div>
            {!product.inStock && (
              <p style={{ color: "red" }}>item out of stock!</p>
            )}
            <AddToCartButton
            disabled={!product.inStock}
              inStock={!product.inStock}
              onClick={() => this.addToCart(product)}
            >
              Add to cart
            </AddToCartButton>
            <ProductDescription>
              {/* convert description into text  */}
              {parse(product.description)}
            </ProductDescription>
          </ProductAttributesContainer>
        </PDPContainer>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCurrency: state.currency.selectedCurrency,
  };
};

export default connect(mapStateToProps, { addProductToCart })(
  withRouter(ProductDetails)
);
