import ProductOutput from "../../../../../models/ProductOutput";

interface ListProductOutputsProps {
    output_id: string;
    onEdit(product_output: ProductOutput): void;
    onDeleted(): void;
};

export type {
    ListProductOutputsProps,
};