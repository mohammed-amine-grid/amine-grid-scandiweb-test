import { compareAttrs, replaceAttrInId } from "../../utils/attributes";

const initState = {
  cartProductsList: [],
  quantity: 0,
};

const cart = (state = initState, action) => {
  const { payload } = action;

  const item = state.cartProductsList.find((product) => {
    return product.id === payload?.id;
  });

  const sameAttributes = compareAttrs(
    item?.selectedAttrs,
    payload?.selectedAttrs
  );

  console.log(state.cartProductsList);

  switch (action.type) {
    case "ADD_TO_CART":
      if (item) {
        // if item already exists increase its quantity by 1
        return {
          ...state,
          cartProductsList: state.cartProductsList.map((item) =>
            item?.id === payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
          quantity: state.quantity + 1,
        };
      } else if (item && !sameAttributes) {
        // if item exists but with different attributes, add it as new item.
        return {
          ...state,
          cartProductsList: [...state.cartProductsList, { ...payload }],
          quantity: state.quantity + 1,
        };
      }
      // add item
      return {
        ...state,
        cartProductsList: [...state.cartProductsList, payload],
        quantity: state.quantity + 1,
      };

    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cartProductsList: state.cartProductsList.map((item) =>
          item.id === payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
        quantity: state.quantity + 1,
      };

    case "DECREMENT_QUANTITY":
      const index = state.cartProductsList.find(
        (item) => item.id === action.payload
      );
      
      // item quantity === 1, remove item from cart
      if (index.quantity === 1) {
        return {
          ...state,
          cartProductsList: state.cartProductsList.filter(
            (item) => item.id !== action.payload
          ),
          quantity: state.quantity - 1,
        };
      }

      // item quanitity > 1, decrease quanitity by
      return {
        ...state,
        cartProductsList: state.cartProductsList.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        quantity: state.quantity - 1,
      };

    case "CHANGE_ATTRIBUTES":
      const changedProduct = state.cartProductsList.find((product) => {
        return product.id === action.payload.productId;
      });
      console.log(state.cartProductsList);

      const newSelectedAttributes = [...changedProduct.selectedAttrs];
      const attrIndex = newSelectedAttributes.find(
        (attr) => attr.id === payload.attrId
      );
      const itemWithSameAttrsExists = state.cartProductsList.find(
        (item) =>
          item.id ===
          replaceAttrInId(changedProduct.id, payload.attrId, payload.attrValue)
      );

      if (attrIndex.value === payload.attrValue) {
        return state;
      } else if (itemWithSameAttrsExists) {
        console.log(itemWithSameAttrsExists.quantity + changedProduct.quantity);
        return {
          ...state,
          cartProductsList: state.cartProductsList
            .map((product) =>
              product.id === itemWithSameAttrsExists.id
                ? {
                    ...product,
                    quantity: product.quantity + changedProduct.quantity,
                  }
                : product
            )
            .filter((product) => product.id !== payload.productId),
        };
      } else {
        attrIndex.value = payload.attrValue;
        console.log("change attr", payload);

        return {
          ...state,
          cartProductsList: state.cartProductsList.map((product) =>
            product.id === payload.productId
              ? {
                  ...product,
                  id: replaceAttrInId(
                    product.id,
                    payload.attrId,
                    payload.attrValue
                  ),
                  selectedAttrs: [...newSelectedAttributes],
                }
              : product
          ),
        };
      }

    default:
      return state;
  }
};

export default cart;
