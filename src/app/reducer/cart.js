import { compareAttrs, changeAttrInId } from "../../utils/attributes";

const initState = {
  cartProductsList: [],
  quantity: 0,
};

const cart = (state = initState, action) => {
  const { payload } = action;
  // find same product, look up by id
  const item = state.cartProductsList.find((product) => {
    return product.id === payload?.id;
  });

  // find if same product has same attributes/ options
  const sameAttributes = compareAttrs(
    item?.selectedAttrs,
    payload?.selectedAttrs
  );

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

      // item quanitity > 1, decrease quanitity by 1.
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
      // find product object whose attributes will change
      const changedProduct = state.cartProductsList.find((product) => {
        return product.id === action.payload.productId;
      });

      // make a copy of its selectedAttrs property
      const newSelectedAttributes = [...changedProduct.selectedAttrs];

      // find the attribute to be changed 
      const attrIndex = newSelectedAttributes.find(
        (attr) => attr.id === payload.attrId
      );
      
      // find if changedProduct becomes a duplicate after attributes change
      // compare ids; each product added to cart has a unique id that describes its name and its selected attributes/options
      const itemWithSameAttrsExists = state.cartProductsList.find(
        (item) =>
          item.id ===
          changeAttrInId(changedProduct.id, payload.attrId, payload.attrValue)
      );
      
      // if no new attrs are selected do nothing
      if (attrIndex.value === payload.attrValue) {
        return state;
      } 
      // if changedProduct is duplicate, remove it from cart and add its quantity to the product already in list.
      else if (itemWithSameAttrsExists) {
        return {
          ...state,
          cartProductsList: state.cartProductsList
            .filter((product) => product.id !== changedProduct.id)
            .map((product) =>
              product.id === itemWithSameAttrsExists.id
                ? {
                    ...product,
                    quantity: product.quantity + changedProduct.quantity,
                  }
                : product
            ),
        };
      } 
      // otherwise simply change the attribute of the product
      else {
        attrIndex.value = payload.attrValue;
        return {
          ...state,
          cartProductsList: state.cartProductsList.map((product) =>
            product.id === payload.productId
              ? {
                  ...product,
                  id: changeAttrInId(
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
