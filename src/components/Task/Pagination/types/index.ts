interface PaginationProps {
    [key: string]: any;
    limit: number;
    offset: number; 
    page: number;
    count: number;
    text: string;
    filter: string; 
    orderBy: string;
    order: "ASC" | "DESC"; 
};

interface TablePaginationProps {
    limit: number;
    page: number;
    count: number;
    labelRowsPerPage?: string;
    handleChangePage(new_page: number): void;
    handleChangeRowsPerPage(event: any): void;
};

export type {PaginationProps, TablePaginationProps};