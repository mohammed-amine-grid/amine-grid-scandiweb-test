export const getPrice = (selectedCurrency = false, priceArray = []) => {
if(selectedCurrency && priceArray.length) {
let price = priceArray.filter(price => price.currency.label === selectedCurrency.label);
return price[0].amount
}
return "N/A"
}