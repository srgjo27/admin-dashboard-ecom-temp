import { useEffect, useState } from "react";
import { Category, Product } from "../data/interfaces/resProduct";
import ProductService from "../services/productService";

const useProducts = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data: Product[] = await ProductService.getProducts();
                setProducts(data);
            } catch (e) {
                const error = e as Error;
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const data = await ProductService.getAllCategory();
                setCategories(data);
            } catch (e) {
                const error = e as Error;
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
        fetchCategories();
    }, []);

    const addProduct = async (
        name: string,
        description: string,
        price: number,
        sku: string,
        quantity: number,
        categoryId: number,
    ) => {
        try {
            const res = await ProductService.addProduct(
                name,
                description,
                price,
                sku,
                quantity,
                categoryId,
            );

            setProducts([...products, res]);

            return res;
        } catch (e) {
            const error = e as Error;
            throw error;
        }
    }

    const removeProduct = async (id: number) => {
        try {
            await ProductService.removeProduct(id);
            setProducts(products.filter((product) => product.id !== id));
        } catch (e) {
            const error = e as Error;
            throw error;
        }
    }

    const updateProduct = async (
        id: number,
        name: string,
        description: string,
        price: number,
        sku: string,
        quantity: number,
        categoryId: number,
    ) => {
        try {
            const res = await ProductService.updateProduct(
                id,
                name,
                description,
                price,
                sku,
                quantity,
                categoryId,
            );

            setProducts(products.map((product) => product.id === id ? res : product));

            return res;
        } catch (e) {
            const error = e as Error;
            throw error;
        }
    }

    return {
        loading,
        products,
        categories,
        addProduct,
        removeProduct,
        updateProduct,
    }
}

export default useProducts;