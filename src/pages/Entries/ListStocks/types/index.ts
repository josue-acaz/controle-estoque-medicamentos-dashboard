import ProductInput from "../../../../models/ProductInput";
import MinimumStock from "../../../../models/MinimumStock";

interface ListStocksProps {
    refresh: boolean;
    onStockSelected(product_input: ProductInput): void;
    onClose(): void;
};

interface StockRowProps {
    name: string;
    product_input: ProductInput;
    minimumStock?: MinimumStock;
    onSelect(product_input: ProductInput): void;
};

export type {ListStocksProps, StockRowProps};