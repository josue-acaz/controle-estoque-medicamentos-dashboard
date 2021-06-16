import Input from "../../../../../../models/Input";
import ProductInput from "../../../../../../models/ProductInput";

interface InputMovementRowProps {
    input: Input;
};

interface CollapseItemsProps {
    product_inputs: Array<ProductInput>;
};

export type {
    InputMovementRowProps,
    CollapseItemsProps,
};