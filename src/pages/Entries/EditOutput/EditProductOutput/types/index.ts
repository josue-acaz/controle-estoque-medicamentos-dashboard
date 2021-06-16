import Output from "../../../../../models/Output";

interface EditProductOutputProps {
    output: Output;
    onSaved(): void;
};

export type {EditProductOutputProps};