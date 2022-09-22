const initState = {
  cartProductsList: [],
  priceTotal: 0,
  quantity: 0,
};

const cart = (state = initState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { payload } = action;
      const item = state.cartProductsList.find(
        (product) => product.id === payload.id
      );

      if (item) {
        return {
          ...state,
          cartProductsList: state.cartProductsList.map((item) =>
            item?.id === payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  priceTotal: state.priceTotal,
                }
              : item
          ),
          quantity: state.quantity + 1,
        };
      }

      return {
        ...state,
        cartProductsList: [...state.cartProductsList, payload],
        quantity: state.quantity + 1,
      };

    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cartProductsList: state.cartProductsList.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        quantity: state.quantity + 1,
      };

    case "DECREMENT_QUANTITY":
      const index = state.cartProductsList.find(
        (item) => item.id === action.payload
      );

      const quantity = index.quantity;
      console.log(quantity);
      if (quantity === 1) {
        return {
          ...state,
          cartProductsList: state.cartProductsList.filter(
            (item) => item.id !== action.payload
          ),
          quantity: state.quantity - 1
        };
      }

      return {
        ...state,
        cartProductsList: state.cartProductsList.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        quantity: state.quantity - 1,
      };
    default:
      return state;
  }
};

export default cart;

// refactor to switch
