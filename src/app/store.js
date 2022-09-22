
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
import { loadCartState } from "../utils/cartLocalStorage";

const persistedCartState = loadCartState()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, persistedCartState,composeEnhancers(applyMiddleware(thunk)));

