import {client, Query} from '@tilework/opus';

const getProductCategories = async () => {
    client.setEndpoint('http://localhost:4000/');
    const categoriesQuery = new Query("categories", true).addFieldList(['name']);
    try {
        const response =  await client.post(categoriesQuery);
        return response.categories;

    }

    catch(error)  {
        console.log(error);
    }
}

export default getProductCategories;