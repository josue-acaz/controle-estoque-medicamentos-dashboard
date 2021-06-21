import React from "react";
import TablePagination from "@material-ui/core/TablePagination";

// types
import {TablePaginationProps} from "./types";

export default function Pagination(props: TablePaginationProps) {
    const {
        count, 
        limit, 
        page, 
        handleChangePage, 
        handleChangeRowsPerPage,
    } = props;

    return(
        <TablePagination
            className="root-pagination"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={limit}
            page={page}
            labelRowsPerPage="Registros por página"
            labelDisplayedRows={({ from, to }) => (`${from}-${to} de ${count !== -1 ? count : `${to}`}`)}
            onChangePage={(e: any, new_page) => handleChangePage(new_page)}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    );
}