import Input from "../../../../../models/Input";

interface ProductInputFormProps {
    input: Input;
    onSaved(): void;
    onCancel(): void;
};

export type {ProductInputFormProps};