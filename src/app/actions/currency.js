import getCurrencies from "../../graphql/getCurrencies"
export const selectCurrency = (payload) => ({type:'SELECT_CURRENCY', payload:payload})
export const getCurrencyList = () => (dispatch) => {
  getCurrencies()
    .then((data) => {dispatch({ type: 'LIST_CURRENCY', payload: data })
                        dispatch({type:'SELECT_CURRENCY', payload:data[0]})
});
};