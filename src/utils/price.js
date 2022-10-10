/**
 * get product price matching the selected currency 
 * @param {{label:String, symbol:String}} selectedCurrency currently selected currency and its symbol
 * @param {{amount:Number, currency:{label:String, symbol:String}}[]} pricesArray prices property in product object
 * @returns {Number || String} returns price matching the selected currency || "N/A"
 */
export const getPrice = (selectedCurrency = false, pricesArray = []) => {
if(selectedCurrency && pricesArray.length) {
let price = pricesArray.filter(price => price.currency.label === selectedCurrency.label);
return price[0]?.amount
}
return "N/A"
}

/**
 * calculate total price of all products added to cart
 * @param {[*]} cartList array of product objects in cart
 * @param {{label:String, symbol:String}} selectedCurrency  currently selected currency
 * @returns {Number} total of all product prices in cart matching the selected currency
 */
export const calculateTotal = (cartList, selectedCurrency) => {
let total = 0;
for(let item of cartList) {
    total += getPrice(selectedCurrency, item.prices) * item.quantity;
}
return total
}

