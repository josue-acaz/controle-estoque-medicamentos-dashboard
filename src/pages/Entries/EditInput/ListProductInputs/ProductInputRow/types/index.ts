import ProductInput from "../../../../../../models/ProductInput";

interface ProductInputRowProps {
    product_input: ProductInput;
    onEdit(id: string): void;
};

export type {ProductInputRowProps};