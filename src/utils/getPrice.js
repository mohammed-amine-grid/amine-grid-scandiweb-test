export const getPrice = (selectedCurrency = false, priceArray = []) => {
if(selectedCurrency && priceArray.length) {
let price = priceArray.filter(price => price.currency.label === selectedCurrency.label);
return price[0]?.amount
}
return "N/A"
}

export const calculateTotal = (cartList, selectedCurrency) => {
let total = 0;
for(let item of cartList) {
    total += getPrice(selectedCurrency, item.prices) * item.quantity;
}
return total
}