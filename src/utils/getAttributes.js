export const getSizes = (product) => {
    // let result = [];
    let sizes =  product?.attributes?.filter(attr => attr.id === "Size");
    if (sizes.length > 0) return sizes[0].items;
    else return null;

}


const getAttributes = (product) => {
let attributes = product.attributes;

}