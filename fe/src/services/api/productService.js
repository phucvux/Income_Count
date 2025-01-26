import httpClient from "./httpClient";


export const getProduct = async () => {
    const result = await httpClient.get('/product');
    return result.data;
}

export const addProduct = async (productData) => {
    const result = await httpClient.post('/product', productData);
    return result.data;
}