import { init } from "@rematch/core";
import {currencyModel} from "./models/currency";

export const store = init({
  currency: currencyModel,
});
