import styled from "@emotion/styled/macro";

const ProductBrand = styled("h3")({
  fontSize: "16px",
  fontWeight: "300",
  display: "block",
});
const ProductName = styled("h4")({
  fontWeight: "300",
});

const ProductPrice = styled("span")({
  marginTop: "10px",
  display: "block",
  fontWeight: "600",
});

const ProductColor = styled("span")(
  {
    display: "inline-block",
    width: "20px",
    height: "20px",
    marginRight: "10px",
    cursor: "pointer",
    "&: hover": {
      outline: "2px solid #5ECE7B",
      outlineOffset: "1px",
    },
  },
  ({ color }) => ({
    backgroundColor: `${color}`,
  }), ({selected}) => selected && {
     outline: "3px solid #5ECE7B",
      outlineOffset: "1px",
  }
);

const AttrTitle = styled("h5")({
  fontWeight: "700",
  fontSize: "18px",
  textTransform: "uppercase",
  fontFamily: "Roboto Condensed",
  marginBottom: "8px",
});

const Attribute = styled("div")({
  display: "inline-block",
  fontWeight: "600",
  fontSize: "14px",
  textAlign: "center",
  lineHeight: "160%",
  minWidth: "24px",
  minHeight: "24px",
  border: "1px solid black",
  marginRight: "8px",
  cursor: "pointer",
  "&: hover": {
    backgroundColor: "black",
    color: "#fff",
  },
}, ({selected}) => selected && {
  backgroundColor:'black',
  color:"#fff"
});

export {
  ProductBrand,
  ProductColor,
  ProductName,
  Attribute,
  ProductPrice,
  AttrTitle,
};
