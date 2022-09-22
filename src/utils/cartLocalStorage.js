export const loadCartState = () => {
     try {
      const serialState = localStorage.getItem('cart-products');
      if (serialState === null) {
        return undefined;
      }
      return JSON.parse(serialState);
    } catch (err) {
      return undefined;
    }
}

export const saveCartState = (state) => {
 try {
      const serialState = JSON.stringify(state);
      localStorage.setItem('cart-products', serialState);
    } catch(err) {
        console.log(err);
    }
    
}


