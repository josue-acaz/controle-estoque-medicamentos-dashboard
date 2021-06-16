import Input from "../../../../models/Input";

interface InputFormProps {
    input: Input;
    onSaved(input: Input): void;
    onProductInputSaved(): void;
};

export type {InputFormProps};