import Input from "../../../../models/Input";

interface InputFormProps {
    input: Input;
    onSaved(input: Input): void;
    onProductInputSaved(): void;
    onProductInputDeleted(): void;
};

export type {InputFormProps};