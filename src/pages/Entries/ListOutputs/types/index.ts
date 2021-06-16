import Output from "../../../../models/Output";

interface ListOutputsProps {
    refresh: boolean;
    outputSelected: Output;
    onOutputSelected(output: Output): void;
};

export type {ListOutputsProps};