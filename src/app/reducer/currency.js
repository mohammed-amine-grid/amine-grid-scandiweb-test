
const initState = {
  currencyList: [],
  selectedCurrency: {},
};

const currency = (state = initState, action) => {
  if (action.type === 'SELECT_CURRENCY') {
    return { ...state, selectedCurrency:action.payload };
  } else if (action.type === 'LIST_CURRENCY') {
    return { ...state, currencyList: action.payload };
  } else {
    return state;
  }
};
export default currency;