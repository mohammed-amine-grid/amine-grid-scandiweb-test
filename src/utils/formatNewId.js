/**
 * creates a new id formed by concatenating: the default id string + "-" + <selected Attribute ID, i.e:'Size'> + "=" + <Selcted Atrribite Value, i.e:"42">
 * @param {*} product  product object
 * @param {{id: String, value:String}[]} defaultAttrs  default attributes when user quickshops
 * @returns {String} a newly formed id, represents all selected attributes/ options of a product
 */

export const formatNewId = (product, defaultAttrs) => {
  const selectedAttrs = product.selectedAttrs || defaultAttrs;
  return (
    product.id +
    "-" +
    selectedAttrs
      .map((attr) => {
        return attr.id + "=" + attr.value;
      })
      .join("-")
  );
};
