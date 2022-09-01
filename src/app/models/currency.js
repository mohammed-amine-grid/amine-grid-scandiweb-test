import { createModel } from "@rematch/core";
import getCurrencies from "../../graphql/getCurrencies";

export const currencyModel = createModel({
  state: { allCurrencies: [], selectedCurrency: "" },
  reducers: {
    getCurrencies: (state, payload) => ({ ...state, allCurrencies: payload }),
    selectMovie: (state, payload) => ({ ...state, selectedCurrency: payload }),
  },
  effects: (dispatch) => ({
    async asyncGetAllCurrencies() {
      const currencies = await getCurrencies();
      dispatch.currency.getCurrencies(currencies);
    },
  }),
});
