/**
 * select default values for each attribute
 * @params {{id:String, items:{value: String, id:String}[]}[]} attrs attributes property in product object
 * @returns  {{id: String, value:String}[]} an array of objects representing each attribute id and its 0 indexed value from the items property
 */

export const getDefaultAttributes = (attrs) => {
  let defaultAttrs = [];
  attrs.forEach((element) => {
    defaultAttrs.push({ id: element.id, value: element.items[0].value });
  });

  return defaultAttrs;
};

/**
 * compare selected attributes of two product objects
 * @param {{id: String, value:String}[]} item1 selected attributes property of product object
 * @param {{id:String, valu: String} []} item2 selected attributes property of product object
 * @returns {Boolean} a boolean of whether the selectedAttrs property of two objects are equal
 */

export const compareAttrs = (item1 = [], item2 = []) => {
  console.log(item1, item2);
  const objectsEqual = (o1, o2) =>
    typeof o1 === "object" && Object.keys(o1).length > 0
      ? Object.keys(o1).length === Object.keys(o2).length &&
        Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
      : o1 === o2;

  return item1.every((o, i) => objectsEqual(o, item2[i]));
};

/**
 * modify id string to account for newly selected attributes
 * @param {String} id id property in product object
 * @param {String} attrId id of the attribute, i.e : "Size"
 * @param {String} attrVal attribute value, i.e "41"
 * @returns {String} modified id string || id unmodified
 */
export const replaceAttrInId = (id, attrId, attrVal) => {
  const matchedAttrVal = id
    .split(attrId + "=")
    .pop()
    .split(",")[0];
  if (matchedAttrVal) {
    return id.slice().replace(matchedAttrVal, attrVal);
  }
  return id;
};
