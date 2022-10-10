import React, { Component } from "react";
import styled from "@emotion/styled";

// Styling, Component at  ≈43

const ProductCarouselContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const ProductCarouselSideImgsContainer = styled("div")({
  marginRight: "30px",
  display: "flex",
  flexDirection: "column",
  maxHeight: "100%",
  "@media(max-width:1199px)": {},
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
  img: {
    width: "100%",
    maxHeight: "510px",
  },
});

class PDPImgCarousel extends Component {
  state = {
    selectedMainImg: this.props.gallery[0],
  };

  selectImg(img) {
    this.setState((prevState) => {
      if (prevState.selectedMainImg === img) return;
      else {
        return { selectedMainImg: img };
      }
    });
  }

  render() {
    const { gallery } = this.props;
    return (
      <ProductCarouselContainer>
        <ProductCarouselSideImgsContainer>
          {gallery.map((imgSrc, i) => (
            <ProductSideImg
              key={i}
              selected={this.state.selectedMainImg === imgSrc}
              onClick={() => this.selectImg(imgSrc)}
              alt="product-img"
              src={imgSrc}
            />
          ))}
        </ProductCarouselSideImgsContainer>
        <ProductCarouselMainImg>
          <img alt="main-product-img" src={this.state.selectedMainImg} />
        </ProductCarouselMainImg>
      </ProductCarouselContainer>
    );
  }
}

export default PDPImgCarousel;
