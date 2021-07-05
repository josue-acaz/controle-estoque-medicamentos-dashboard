import Base from "../../../../../models/Base";

interface MinimumStockRowProps {
    base: Base;
    numSelected: number;
    selected: boolean;
    onEdit(id: string): void;
    onDelete(selecteds: Array<string>): void;
};

interface onChangeQtdProps {
    id: string;
    quantity: number;
};

interface onChangeMinimumStockProps {
    id?: string;
    product_id: string;
    quantity: number;
};

interface QuantityCellProps {
    id: string;
    quantity: number;
    onChange(e: onChangeQtdProps): void;
};

export type {
    onChangeQtdProps,
    QuantityCellProps,
    MinimumStockRowProps,
    onChangeMinimumStockProps,
};