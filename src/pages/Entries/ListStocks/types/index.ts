import ProductInput from "../../../../models/ProductInput";

interface ListStocksProps {
    refresh: boolean;
    onStockSelected(product_input: ProductInput): void;
};

export type {ListStocksProps};