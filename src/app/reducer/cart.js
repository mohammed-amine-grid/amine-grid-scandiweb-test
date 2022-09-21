const initState = {
    cartProductsList : [], 
    
}

const cart = (state = initState, action) => {
    if(action.type === 'ADD_CART') {
        return {...state, cartProductsList:action.payload}
    }
    else {
        return state;
    }
}




export default cart;


// refactor to switch