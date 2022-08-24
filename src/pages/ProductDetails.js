import React, { Component } from "react";
import styled from "@emotion/styled";
import {
  ProductBrand,
  ProductName,
  ProductColor,
  ProductSize,
  ProductPrice,
} from "../components/ProductAttributes";

// 611w 511h / 80 80

const productImgs = [
  "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
  "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg",
  "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg",
  "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg",
  "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg",
  "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png",
  "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png",
];

const PDPContainer = styled("div")({
  display: "flex",
  width: "100vw",
  padding: "82px 97px",
  justifyContent: "center",
  "@media(max-height:930px)": {
    padding: "20px 97px",
  },
});

const ProductCarouselContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent:'center'
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
  width:'100%',
  h5: {
    fontWeight: "700",
    fontSize: "18px",
    textTransform: "uppercase",
    fontFamily: "Roboto Condensed",
    marginBottom: "8px",
  },
  [ProductBrand]: {
    fontSize: "30px",
    fontWeight: "600",
  },
  [ProductName]: {
    fontSize: "30px",
    fontWeight: "400",
    marginBottom: "40px",
  },
  [ProductSize]: {
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
});

const ProductDescription = styled("p")({
  fontFamily: "Roboto",
  fontSize: "16px",
  width: "293px",
  lineHeight: "160%",
  marginTop: "40px",
});

export default class ProductDetails extends Component {
  state = {
    selectedMainImg: productImgs[0],
  };

  selectImg(img) {
    this.setState((prevState, _) => {
      if (prevState.selectedMainImg === img) return;
      else {
        return { selectedMainImg: img };
      }
    });
  }

  render() {
    return (
      <PDPContainer>
        <ProductCarouselContainer>
          <ProductCarouselSideImgsContainer>
            {productImgs.map((img, i) => (
              <ProductSideImg
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
            <ProductBrand>Apollo</ProductBrand>
            <ProductName>Running Shorts</ProductName>
          </div>
          <div>
            <h5>size</h5>
            <ProductSize>XS</ProductSize>
            <ProductSize>M</ProductSize>
            <ProductSize>S</ProductSize>
            <ProductSize>L</ProductSize>
          </div>
          <div>
            <h5>color:</h5>
            <ProductColor color="black" />
            <ProductColor color="gray" />
            <ProductColor color="#0F6450" />
          </div>

          <div>
            <h5>Price</h5>
            <ProductPrice>$50.00</ProductPrice>
          </div>

          <AddToCartButton>Add to cart</AddToCartButton>
          <ProductDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex placeat
            molestiae modi! Excepturi, quod unde. Eius id temporibus sapiente a
            illo voluptatibus. Alias repellat quos adipisci aliquam suscipit
            quidem fuga.
          </ProductDescription>
        </ProductAttributesContainer>
      </PDPContainer>
    );
  }
}
