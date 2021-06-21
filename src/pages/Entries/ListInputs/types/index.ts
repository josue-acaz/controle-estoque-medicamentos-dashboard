import Input from "../../../../models/Input";

interface ListInputsProps {
    refresh: boolean;
    inputSelected: Input;
    onDeleted(): void;
    onSelected(input: Input): void;
};

export type {ListInputsProps};