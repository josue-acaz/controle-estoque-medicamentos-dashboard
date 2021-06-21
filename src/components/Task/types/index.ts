interface CellProps {
    value: any;
    align?: string;
    color?: string;
};

interface RowProps {
    id: string;
    cells: Array<CellProps>;
    hoverTitle?: string;
    hoverSelected?: boolean;
    onHoverClick?(): void;
};

interface TableHeadProps {
    key: string;
    value: string;
    color?: string;
    textColor?: string;
};

interface TableCellProps {
    padding?: string;
    align?: string;
};

interface TableRowProps {
    selected?: boolean;
};

interface TableHeadCellProps {
    textColor?: string;
    align?: string;
    padding?: string;
    fixedHeader?: boolean;
};

interface TableProps {
    color?: string;
    rows: Array<RowProps>;
    fixedHeader?: boolean;
    selecteds: Array<string>;
    widthActions?: boolean;
    headLabels: Array<TableHeadProps>;
    onEditRow?(id: string): void;
    onChangeSelecteds(selecteds: Array<string>): void;
};

interface TableHeadComponentProps {
    color?: string;
    rowCount: number;
    numSelected: number;
    fixedHeader?: boolean;
    widthActions?: boolean;
    headLabels: Array<TableHeadProps>;
    onSelectAllClick(event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void;
};

interface TableRowComponentProps {
    row: RowProps;
    selected: boolean;
    widthActions?: boolean;
    hoverTitle?: string;
    hoverSelected?: boolean;
    onEdit?(id: string): void;
    onClick(event: any, id: string): void;
    onHoverClick?(): void;
};

export type {
    RowProps,
    TableProps, 
    TableRowProps,
    TableHeadProps,
    TableCellProps, 
    TableHeadCellProps,
    TableRowComponentProps,
    TableHeadComponentProps,
};