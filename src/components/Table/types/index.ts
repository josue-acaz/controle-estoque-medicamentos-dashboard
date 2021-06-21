interface TableHeadProps {
    key: string;
    value: string;
};

interface TableHeadCellProps {
    fixedHeader?: boolean;
    padding?: string;
    color?: string;
};

interface TableCellProps {
    padding?: string;
};

interface TableRowProps {
    selected?: boolean;
};

interface TableProps {
    color?: string;
    fixedHeader?: boolean;
    withActions?: boolean;
    numSelected: number;
    rowCount: number;
    headLabels: Array<TableHeadProps>;
    onSelectAllClick(event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void;
};

export type {
    TableProps, 
    TableRowProps,
    TableHeadProps,
    TableCellProps, 
    TableHeadCellProps,
};