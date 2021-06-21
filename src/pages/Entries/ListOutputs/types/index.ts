import Output from "../../../../models/Output";

interface ListOutputsProps {
    refresh: boolean;
    outputSelected: Output;
    onSelected(output: Output): void;
    onDeleted(): void;
};

export type {ListOutputsProps};