const initState = {
    cartProductsList : [],
    priceTotal:0 
    
}

const cart = (state = initState, action) => {
    if(action.type === 'ADD_TO_CART') {
        return {...state, cartProductsList: [...state.cartProductsList, action.payload]}
    }
    else {
        return state;
    }
}




export default cart;


// refactor to switch