interface StatusProps {
    stockQuantity: number;
    minimumStockQuantity: number;
};

interface StatusViewProps {
    status: string;
};

interface StatusOpProps {
    label: string;
    value: string;
};

export type {
    StatusProps,
    StatusOpProps,
    StatusViewProps,
};