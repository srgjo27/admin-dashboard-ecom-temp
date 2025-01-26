interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    sku: string;
    quantity: number;
    category: Category;
}

export type { Category, Product };