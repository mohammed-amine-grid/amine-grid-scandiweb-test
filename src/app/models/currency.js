import { createModel } from "@rematch/core";
import getCurrencies from "../../graphql/getCurrencies";

export const currencyModel = createModel({
  state: { allCurrencies: [], selectedCurrency: "" },
  reducers: {
    setCurrenciesList(state, payload) {
      return {...state, allCurrencies:payload}
    },
    selectCurrency: (state, payload) => ({ ...state, selectedCurrency: payload }),
  },
  effects: () => ({
    async asyncGetAllCurrencies(dispatch) {
      // const currencies = await getCurrencies();
     const allCurr = await getCurrencies();

      dispatch.currencyModel.setCurrenciesList(allCurr);
    },
  }),
});
