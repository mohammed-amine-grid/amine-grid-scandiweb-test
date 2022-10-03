export const addProductToCart = (payload) => ({type:'ADD_TO_CART', payload:payload})

export const decrementProduct = (payload) => ({type:'DECREMENT_QUANTITY', payload:payload})

export const incrementProduct = (payload) => ({type:'INCREMENT_QUANTITY', payload:payload})

export const changeAttribute = (payload) => ({type:'CHANGE_ATTRIBUTES', payload: payload})