import Output from "../../../../../../models/Output";
import ProductOutput from "../../../../../../models/ProductOutput";

interface OutputMovementRowProps {
    output: Output;
};

interface CollapseItemsProps {
    product_outputs: Array<ProductOutput>;
};

export type {
    CollapseItemsProps,
    OutputMovementRowProps,
};