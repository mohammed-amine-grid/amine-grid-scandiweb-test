import getAllCurrencies from "../../graphql/getCurrencies"

const getCurrencies = async () => {
const response = await getAllCurrencies();
return response.currencies;    
}


const currencyService = {
    getCurrencies
}

export default currencyService;

