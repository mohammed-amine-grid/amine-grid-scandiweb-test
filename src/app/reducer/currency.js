const initState = {
  currencyList: [],
  selectedCurrency: {},
};

const currency = (state = initState, action) => {
  switch (action.type) {
    case "SELECT_CURRENCY":
      return { ...state, selectedCurrency: action.payload };

    case "LIST_CURRENCY":
      return { ...state, currencyList: action.payload };

    default:
      return state;
  }
};
export default currency;
