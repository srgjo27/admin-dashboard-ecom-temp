import axios, { AxiosError } from "axios";
import { 
    CREATE_PRODUCT_URL, 
    GET_CATEGORY_URL, 
    GET_PRODUCT_URL, 
    REMOVE_PRODUCT_URL, 
    UPDATE_PRODUCT_URL 
} from "../constants/ApiString";

const getProducts = async () => {
    try {
        const res = await axios.get(`${GET_PRODUCT_URL}`);

        return res.data;
    }catch(e){
        const error = e as AxiosError;
        throw error.response?.data;
    }
}

const addProduct = async (
    name: string,
    description: string,
    price: number,
    sku: string,
    quantity: number,
    categoryId: number,
) => {
    try {
        const res = await axios.post(`${CREATE_PRODUCT_URL}`, {
            name,
            description,
            price,
            sku,
            quantity,
            categoryId
        });

        return res.data;
    } catch(e){
        const error = e as AxiosError;
        throw error.response?.data;
    }
}

const getAllCategory = async () => {
    try {
        const res = await axios.get(`${GET_CATEGORY_URL}`);

        return res.data;
    }catch(e){
        const error = e as AxiosError;
        throw error.response?.data;
    }
}

const removeProduct = async (id: number) => {
    try {
        const res = await axios.delete(`${REMOVE_PRODUCT_URL.replace(':id', id.toString())}`);

        return res.data;
    }catch(e){
        const error = e as AxiosError;
        throw error.response?.data;
    }
}

const updateProduct = async (
    id: number,
    name: string, 
    description: string,
    price: number,
    sku: string,
    quantity: number,
    categoryId: number
) => {
    try {
        const res = await axios.patch(`${UPDATE_PRODUCT_URL.replace(':id', id.toString())}`, {
            name,
            description,
            price,
            sku,
            quantity,
            categoryId
        });

        return res.data;
    } catch(e){
        const error = e as AxiosError;
        throw error.response?.data;
    }
}

const ProductService = {
    getProducts: getProducts,
    addProduct: addProduct,
    getAllCategory: getAllCategory,
    removeProduct: removeProduct,
    updateProduct: updateProduct,
}

export default ProductService;