import ProductOutput from "../../../../../../models/ProductOutput";

interface ProductOutputRowProps {
    product_output: ProductOutput;
    onEdit(id: string): void;
};

export type {ProductOutputRowProps};