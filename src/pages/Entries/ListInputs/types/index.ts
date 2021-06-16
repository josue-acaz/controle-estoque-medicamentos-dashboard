import Input from "../../../../models/Input";

interface ListInputsProps {
    refresh: boolean;
    inputSelected: Input;
    onInputSelected(input: Input): void;
};

export type {ListInputsProps};