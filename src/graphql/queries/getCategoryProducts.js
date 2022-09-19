import { client, Query, Field } from "@tilework/opus";

const getCategoryProducts = async (category) => {
  client.setEndpoint("http://localhost:4000/");
  const productsQuery = new Query("category", true)
    .addArgument("input", "CategoryInput", { title: category })
    .addField(
      new Field("products", true).addFieldList([
        "id",
        "name",
        "brand",
        "inStock",
        "gallery",
        "prices{amount, currency{label, symbol}}",
      ])
    );
  try {
    const response = await client.post(productsQuery);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default getCategoryProducts;
