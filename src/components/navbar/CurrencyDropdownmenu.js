import React, { Component } from "react";
import styled from "@emotion/styled";
import arrowup from "../../imgs/arrow-up.svg";
import arrowdown from "../../imgs/arrow-down.svg";
import { connect } from "react-redux";
import { getCurrencyList, selectCurrency } from "../../app/actions/currency";

const DropdownContainer = styled("div")({
  marginRight: "25px",
});

const DropdownList = styled("ul")({
  backgroundColor:'white',
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  position: "absolute",
  width: "114px",
  minHeight: "170px",
  marginTop: "10px",
  right: "-24px",
  boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.1)",
  fontSize: "1.3rem",
  fontWeight: "500",

  li: {
    listStyle: "none",
    width: "100%",
    padding: "10px",
    paddingLeft: "20px",
    cursor:'pointer',
    ":hover": {
      backgroundColor: "#EEEEEE",
    },
  },
});

const DropdownHeader = styled("div")(
  {
    width: "35px",
    fontWeight: "600",
    fontSize: "18px",
    cursor: "pointer",
  },
  (props) => ({
    background: `url(${props.toggled ? arrowdown : arrowup}) no-repeat right`,
  })
);

class CurrencyDropdownmenu extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleCurrencySelection = this.handleCurrencySelection.bind(this);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.props.getCurrencyList();
    console.log(this.props);
  }
  //WARNING! To be deprecated in React v17. Use componentDidMount instead.

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ open: false });
    }
  }

  toggleDropdown() {
    this.setState({ open: !this.state.open });
  }

  handleCurrencySelection(curr) {
    this.props.selectCurrency(curr);
  }

  render() {
    const { selectedCurrency, currencyList } = this.props.state;
    return (
      <DropdownContainer ref={this.wrapperRef}>
        {selectedCurrency && (
          <DropdownHeader
            toggled={this.state.open}
            onClick={this.toggleDropdown.bind(this)}
          >
            {selectedCurrency.symbol}
          </DropdownHeader>
        )}
        {this.state.open && (
          <DropdownList>
            {currencyList &&
              currencyList.map((currency) => (
                <li
                  onClick={() => this.handleCurrencySelection(currency)}
                  key={currency.symbol}
                >
                  {currency.label}
                </li>
              ))}
          </DropdownList>
        )}
      </DropdownContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.currency,
  };
};

export default connect(mapStateToProps, { getCurrencyList, selectCurrency })(
  CurrencyDropdownmenu
);
