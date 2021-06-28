import ProductInput from "../../../../../models/ProductInput";

interface ListProductInputsProps {
    input_id: string;
    onEdit(product_input: ProductInput): void;
    onDeleted(): void;
};

interface OutputQuantityCellProps {
    number?: number;
    quantity?: number;
}

export type {
    ListProductInputsProps, 
    OutputQuantityCellProps,
};