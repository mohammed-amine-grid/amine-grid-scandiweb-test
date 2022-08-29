import {client, Query} from '@tilework/opus';

const getCurrencies = async () => {
    client.setEndpoint('http://localhost:4000/');
    const currenciesQuery = new Query("currencies", true).addFieldList(['label', 'symbol'])
    try {
        const response =  await client.post(currenciesQuery);
        return response.currencies;

    }

    catch(error)  {
        console.log(error);
    }
}

export default getCurrencies;