interface RefreshProps {
    [key: string]: any;
    input_list: boolean;
    output_list: boolean;
    stock_list: boolean;
};

interface StockProps {
    show: boolean;
};

interface SelectedStockProps {
    base_name: string;
    product_name: string;
    base_id: string;
    product_id: string;
};

export type {RefreshProps, StockProps, SelectedStockProps};