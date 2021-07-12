import ProductInput from "../../../../models/ProductInput";
import MinimumStock from "../../../../models/MinimumStock";
import {SelectedStockProps} from "../../types"

interface ListStocksProps {
    refresh: boolean;
    onStockSelected(selectedStock: SelectedStockProps): void;
    onClose(): void;
};

interface StockRowProps {
    name: string;
    product_input: ProductInput;
    minimumStock?: MinimumStock;
    onSelect(product_input: ProductInput): void;
};

export type {ListStocksProps, StockRowProps};