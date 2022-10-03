import React, { Component } from "react";
import styled from "@emotion/styled";
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
import { getPrice } from "../utils/getPrice";
import { getAttributes } from "../utils/attributes";

import { addProductToCart } from "../app/actions/cart";

const PDPContainer = styled("div")({
  display: "flex",
  width: "100vw",
  padding: "42px 97px",
  justifyContent: "center",
  "@media(max-height:930px)": {
    padding: "20px 97px",
  },
});

const ProductCarouselContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const ProductCarouselSideImgsContainer = styled("div")({
  marginRight: "30px",
  display: "flex",
  flexDirection: "column",
});

const ProductSideImg = styled("img")(
  {
    display: "block",
    height: "80px",
    width: "79px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  ({ selected }) =>
    selected && {
      outline: "2px solid #5ECE7B",
      outlineOffset: "2px",
    }
);

const ProductCarouselMainImg = styled("div")({
  width: "611px",
  // flex:'',
  img: {
    width: "100%",
    maxHeight: "510px",
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
    marginBottom: "40px",
  },
  [Attribute]: {
    width: "63px",
    height: "45px",
    fontSize: "16px",
    lineHeight: "2.7",
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

const AddToCartButton = styled("button")({
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
});

const ProductDescription = styled("p")({
  fontFamily: "Raleway",
  fontSize: "18px",
  width: "293px",
  lineHeight: "160%",
  marginTop: "40px",
});

class ProductDetails extends Component {
  state = {
    selectedMainImg: "",
    product: null,
  };
  componentDidMount() {
    getProduct(this.props.params["*"]).then(({ product }) => {
      const attrs = product?.attributes;

      this.setState({
        product: { ...product, selectedAttrs: getAttributes(attrs) },
        selectedMainImg: product.gallery[0],
      });
    });
  }

  selectImg(img) {
    this.setState((prevState, _) => {
      if (prevState.selectedMainImg === img) return;
      else {
        return { selectedMainImg: img };
      }
    });
  }

  addToCart(product) {
    let addedProduct = { ...product, quantity: 1 };
    this.props.addProductToCart(addedProduct);
  }

  selectAttribute(selectedAttr) {
    const selectedAttrs = [...this.state.product.selectedAttrs];

   const newSelectedAttributes =  selectedAttrs.map(attr => attr.id === selectedAttr.id ? {...attr, value: selectedAttr.value} : attr)

    // const index = newSelectedAttribute.find(
    //   (attr) => attr.id === selectedAttr.id
    // );
    // index.value = selectedAttr.value;
    
    // console.log(index);

    // if (index) {
      this.setState({
        product: {
          ...this.state.product,
          selectedAttrs: [...newSelectedAttributes],
        },
      });
    // }
  }

  render() {
    const product = this.state.product;
    // console.log(product);
    const { selectedCurrency } = this.props;
    const prices = product?.prices;
    const price = getPrice(selectedCurrency, prices);

    return (
      product && (
        <PDPContainer>
          <ProductCarouselContainer>
            <ProductCarouselSideImgsContainer>
              {product.gallery.map((img, i) => (
                <ProductSideImg
                  key={i}
                  selected={this.state.selectedMainImg === img}
                  onClick={() => this.selectImg(img)}
                  alt="product-img"
                  src={img}
                />
              ))}
            </ProductCarouselSideImgsContainer>
            <ProductCarouselMainImg>
              <img alt="main-product-img" src={this.state.selectedMainImg} />
            </ProductCarouselMainImg>
          </ProductCarouselContainer>
          <ProductAttributesContainer>
            <div>
              <ProductBrand>{product.brand}</ProductBrand>
              <ProductName>{product.name}</ProductName>
            </div>

            {product.attributes.map((attr) => (
              <div key={attr.id}>
                <AttrTitle>{attr.id}</AttrTitle>
                {attr.items.map((item) =>
                  item.value[0] === "#" ? (
                    <ProductColor
                      selected={product.selectedAttrs.some(
                        (selectedAttr) =>
                          selectedAttr.id === attr.id &&
                          selectedAttr.value === item.value
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
                      selected={product.selectedAttrs.some(
                        (selectedAttr) =>
                          selectedAttr.id === attr.id &&
                          selectedAttr.value === item.value
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

            <AddToCartButton onClick={() => this.addToCart(product)}>
              Add to cart
            </AddToCartButton>
            <ProductDescription>
              {product.description.replace(/(<([^>]+)>)/gi, "")}
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
