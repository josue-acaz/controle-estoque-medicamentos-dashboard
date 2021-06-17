import Product from "../../../../../models/Product";

interface ProductRowProps {
    product: Product;
    onEdit(id: string): void;
};

export type {ProductRowProps};