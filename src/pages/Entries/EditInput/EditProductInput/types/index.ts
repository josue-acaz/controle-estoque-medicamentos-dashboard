import Input from "../../../../../models/Input";
import ProductInput from "../../../../../models/ProductInput";

interface ProductInputFormProps {
    input: Input;
    productInput: ProductInput;
    onSaved(): void;
    onCancel(): void;
};

export type {ProductInputFormProps};