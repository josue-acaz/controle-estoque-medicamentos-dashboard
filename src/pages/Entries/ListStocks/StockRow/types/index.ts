import ProductInput from "../../../../../models/ProductInput";
import MinimumStock from "../../../../../models/MinimumStock";

interface StockRowProps {
    name: string;
    product_input: ProductInput;
    minimumStock?: MinimumStock;
    onSelect(product_input: ProductInput): void;
};

export type {StockRowProps};