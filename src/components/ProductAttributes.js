// styled components used in "CartItem" and "ProductDetailsPage"

// styling for product attributes when rendered inside cartoverlay, styles are modified when rendered in "Cart" or "PDP" by selecting [<StyledComponent>] in respective parent and overriding rules.
// ideally it should've been the other way around, default styles for normal item display then modified in cartoverlay item display, I'll fix it if it's code smell!

import styled from "@emotion/styled/macro";

const ProductBrand = styled("h3")({
  fontSize: "16px",
  fontWeight: "300",
  display: "block",
  lineHeight: "160%",
});
const ProductName = styled("h4")({
  fontWeight: "300",
});

const ProductPrice = styled("span")({
  lineHeight: "160%",
  fontWeight: "600",
  display: "inline-block",
  marginBottom: "8px",
});

const ProductColor = styled("span")(
  {
    display: "inline-block",
    width: "20px",
    height: "20px",
    marginRight: "10px",
    border: "1px solid #5ECE7B",
  },
  ({ color }) => ({
    backgroundColor: `${color}`,
  }),
  ({ selected }) =>
    selected && {
      outline: "2px solid #5ECE7B",
      outlineOffset: "1px",
    },

  ({ cartpageDisplay }) =>
    cartpageDisplay && {
      "&: hover": {
        cursor: "pointer",
        outline: "2px solid #5ECE7B",
        outlineOffset: "1px",
      },
    }
);

const AttrTitle = styled("h5")({
  fontWeight: "400",
  fontSize: "14px",
  textTransform: "uppercase",
  fontFamily: "Raleway",
  margin: "10px 0",
});

const Attribute = styled("div")(
  {
    display: "inline-block",
    fontWeight: "400",
    fontSize: "14px",
    textAlign: "center",
    lineHeight: "160%",
    minWidth: "24px",
    minHeight: "24px",
    padding: "2px",
    border: "1px solid black",
    marginRight: "8px",
  },
  ({ selected }) =>
    selected && {
      backgroundColor: "black",
      color: "#fff",
    },

  ({ cartpageDisplay }) =>
    cartpageDisplay && {
      cursor: "pointer",
      "&: hover": {
        backgroundColor: "black",
        color: "#fff",
      },
    }
);

export {
  ProductBrand,
  ProductColor,
  ProductName,
  Attribute,
  ProductPrice,
  AttrTitle,
};
