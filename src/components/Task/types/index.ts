interface ActionProps {
    icon: any;
    label: string;
    onClick(id: string): void;
};

interface CellProps {
    value: any;
    align?: string;
    color?: string;
};

interface RowProps {
    id: string;
    cells: Array<CellProps>;
    hoverTitle?: string;
    disable_select?: boolean;
    hoverSelected?: boolean;
    actions?: Array<ActionProps>;
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
    selectable?: boolean;
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
    selectable: boolean;
    numSelected: number;
    fixedHeader?: boolean;
    widthActions?: boolean;
    headLabels: Array<TableHeadProps>;
    onSelectAllClick(event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void;
};

interface TableRowComponentProps {
    row: RowProps;
    selected: boolean;
    selectable: boolean;
    widthActions?: boolean;
    hoverTitle?: string;
    hoverSelected?: boolean;
    disable_select?: boolean;
    actions?: Array<ActionProps>;
    onEdit?(id: string): void;
    onClick(event: any, id: string): void;
    onHoverClick?(): void;
};

interface TableRowViewProps {
    selected?: boolean;
    enableHover?: boolean;
    hoverSelected?: boolean;
};

export type {
    RowProps,
    TableProps, 
    TableRowProps,
    TableHeadProps,
    TableCellProps, 
    TableRowViewProps,
    TableHeadCellProps,
    TableRowComponentProps,
    TableHeadComponentProps,
};