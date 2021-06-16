import Output from "../../../../../models/Output";

interface OutputRowProps {
    output: Output;
    selected: boolean;
    onSelect(output: Output): void;
};

export type {OutputRowProps};