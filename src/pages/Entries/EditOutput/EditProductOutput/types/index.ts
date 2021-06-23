import Output from "../../../../../models/Output";
import ProductOutput from "../../../../../models/ProductOutput";

interface EditProductOutputProps {
    output: Output;
    productOutput: ProductOutput;
    onSaved(): void;
    onCancel(): void;
};

export type {EditProductOutputProps};