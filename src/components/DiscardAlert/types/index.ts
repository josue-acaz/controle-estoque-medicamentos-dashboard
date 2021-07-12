import Discard from "../../../models/Discard";
import ProductInput from "../../../models/ProductInput";

interface DiscardAlertProps {
    open: boolean; 
    productInput: ProductInput;
    onCancel(): void; 
    onConfirm(discard: Discard): void;
    onClose(): void;
};

export type {DiscardAlertProps};