import React, { Component } from "react";
import styled from "@emotion/styled";
import ProductListingCard from "../components/ProductListingCard";

const PLPContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap:'40px'
});

export default class ProductListing extends Component {
  render() {
    return <PLPContainer>
        <ProductListingCard inStock />
        <ProductListingCard inStock />
        <ProductListingCard  inStock />
        <ProductListingCard />
        <ProductListingCard inStock />
        <ProductListingCard inStock />
        <ProductListingCard inStock />
    </PLPContainer>;
  }
}
