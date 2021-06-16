interface TableHeadProps {
    key: string;
    value: string;
};

interface TableHeadCellProps {
    fixedHeader?: boolean;
    color?: string;
};

interface TableProps {
    headLabels: Array<TableHeadProps>;
    fixedHeader?: boolean;
    color?: string;
};

export type {TableProps, TableHeadProps, TableHeadCellProps};