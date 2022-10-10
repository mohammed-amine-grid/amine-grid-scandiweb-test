import React, { Component } from "react";
import styled from "@emotion/styled";
import ProductListingCard from "../components/ProductListingCard";
import { withRouter } from "../routes/withRouter";
import getCategoryProducts from "../graphql/queries/getCategoryProducts";
const PLPContainer = styled("div")({
  padding: "70px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 368px);",
  justifyContent: "center",
  justifyItems: "center",
  gap: "40px",
  "@media (min-width:1399px)": {
    gridTemplateColumns: "repeat(3, 1fr);",
  },
});

class ProductListing extends Component {
  state = {
    products: [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.params["*"] !== this.props.params["*"]) this.getProducts();
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    getCategoryProducts(this.props.params["*"]).then((data) =>
      this.setState({ products: data.category.products })
    );
  }
  render() {
    return (
      <PLPContainer>
        {this.state.products.length
          ? this.state.products.map((product) => (
              <ProductListingCard key={product.id} {...product} />
            ))
          : null}
      </PLPContainer>
    );
  }
}

export default withRouter(ProductListing);
