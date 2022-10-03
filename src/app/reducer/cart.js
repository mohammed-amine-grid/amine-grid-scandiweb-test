import { act } from "react-dom/test-utils";
import { compareAttrs } from "../../utils/attributes";

const initState = {
  cartProductsList: [],
  quantity: 0,
};

const cart = (state = initState, action) => {
  
  
  const { payload } = action;



  const item = state.cartProductsList.find(
    (product) =>   {
      console.log(product.id);
      return product.id === payload?.id && compareAttrs(product.selectedAttrs, payload?.selectedAttrs);
    } 
    );
  
  // console.log(item);

    const sameAttributes = compareAttrs(
      item?.selectedAttrs,
      payload?.selectedAttrs
      );
      const defaultItemId = item?.id.split("!").shift();
      
      const sameProduct = defaultItemId === payload?.id;
  
  
 
  

  
// case 1 : find item, same attrs => increment


  switch (action.type) {
    case "ADD_TO_CART":
          // console.log(item?.id);
          // console.log(item.id, action.payload.id);
          // console.log(item.selectedAttrs ,'hehe', action.payload.selectedAttrs);
          if (item && sameAttributes) {
        console.log(sameProduct, 'hh', sameAttributes);
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
          quantity: state.quantity + 1
        };
      } else if (item && !sameAttributes) {

       
        return {
          ...state,
          cartProductsList: [
            ...state.cartProductsList,
            {...payload, id: `${payload.id}!${Date.now()}` },
          ],
          quantity: state.quantity + 1,
        };
      } else if (sameProduct && sameAttributes) {
        console.log("heh");
        return {
          ...state,
          cartProductsList: state.cartProductsList.map((item) =>
            defaultItemId === item.id
              ? { ...payload, quantity: item.quantity + 1 }
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
          item.id === payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
        quantity: state.quantity + 1,
      };

    case "DECREMENT_QUANTITY":
      const index = state.cartProductsList.find(
        (item) => item.id === action.payload
      );

      if (index.quantity === 1) {
        return {
          ...state,
          cartProductsList: state.cartProductsList.filter(
            (item) => item.id !== action.payload
          ),
          quantity: state.quantity - 1,
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

    case "CHANGE_ATTRIBUTES":
      const product = state.cartProductsList.find(
        (product) => product.id === action.payload.productId
      );
      const newSelectedAttributes = [...product.selectedAttrs];
      const attrIndex = newSelectedAttributes.find(
        (attr) => attr.id === payload.attrId
      );
      if (attrIndex.value === payload.attrValue) {
        return state;
      } else {
        attrIndex.value = payload.attrValue;
        return {
          ...state,
          cartProductsList: state.cartProductsList.map((product) =>
            product.id === payload.productId
              ? { ...product, selectedAttrs: [...newSelectedAttributes] }
              : product
          ),
        };
      }

    // const changedProduct = {...product, }

    default:
      return state;
  }
};

export default cart;

// refactor to switch
