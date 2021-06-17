import Base from "../../../../../models/Base";

interface MinimumStockRowProps {
    base: Base;
    numSelected: number;
    selected: boolean;
    onEdit(id: string): void;
};

export type {MinimumStockRowProps};