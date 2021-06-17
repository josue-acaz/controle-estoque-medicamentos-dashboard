import Output from "../../../../../models/Output";

interface EditProductOutputProps {
    output: Output;
    onSaved(): void;
    onCancel(): void;
};

export type {EditProductOutputProps};