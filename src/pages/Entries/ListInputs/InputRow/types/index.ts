import Input from "../../../../../models/Input";

interface InputRowProps {
    input: Input;
    selected: boolean;
    onSelect(input: Input): void;
};

export type {InputRowProps};