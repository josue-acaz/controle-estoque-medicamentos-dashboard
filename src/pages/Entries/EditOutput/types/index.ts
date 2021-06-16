import Output from "../../../../models/Output";

interface EditOutputProps {
    output: Output;
    onSaved(output: Output): void;
    onProductOutputSaved(): void;
};

export type {EditOutputProps};