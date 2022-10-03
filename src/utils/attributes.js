export const getAttributes = (attrs) => {
  let defaultAttrs = [];
  attrs.forEach((element) => {
    defaultAttrs.push({ id: element.id, value: element.items[0].value });
  });

  return defaultAttrs;
};

export const compareAttrs = (item1 = [], item2 = []) => {
const objectsEqual = (o1, o2) => 
    typeof o1 === 'object' && Object.keys(o1).length > 0 
        ? Object.keys(o1).length === Object.keys(o2).length 
            && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p]))
        : o1 === o2;

        return item1.every((o, i) => objectsEqual(o, item2[i]))
}