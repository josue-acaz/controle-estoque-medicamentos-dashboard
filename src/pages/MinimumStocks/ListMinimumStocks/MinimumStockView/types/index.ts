import Base from "../../../../../models/Base";

interface MinimumStockRowProps {
    base: Base;
    numSelected: number;
    selected: boolean;
    onEdit(id: string): void;
    onDelete(selecteds: Array<string>): void;
};

export type {MinimumStockRowProps};