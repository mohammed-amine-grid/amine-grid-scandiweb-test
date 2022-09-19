import { client, Query} from "@tilework/opus";

const getProduct = async (productId) => {

    client.setEndpoint("http://localhost:4000");

    const query = new Query("product", true)
   .addArgument("id", "String!", productId)   
   .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {id, items {value, id}}", "prices {amount, currency{label,symbol}}"])

    return await client.post(query)
  }

export default getProduct