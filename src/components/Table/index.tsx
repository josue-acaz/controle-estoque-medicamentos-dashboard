import React from "react";
import Checkbox from "@material-ui/core/Checkbox";

// types
import {TableProps} from "./types";

// styles
import {
    TableView, 
    TableBody, 
    TableRow, 
    TableHead, 
    TableHeadCell,
} from "./styles";

const Table: React.FC<TableProps> = (props) => {
    const {children, headLabels, fixedHeader, color, withActions, numSelected, rowCount, onSelectAllClick} = props;

    return(
        <TableView>
            <TableHead>
                <TableRow>
                    {headLabels.map(head_label => (
                        <TableHeadCell 
                            key={head_label.key} 
                            fixedHeader={fixedHeader}
                            color={color}
                        >
                            {head_label.value}
                        </TableHeadCell>
                    ))}
                    {withActions && <TableHeadCell style={{textAlign: "right"}}>Ações</TableHeadCell>}
                </TableRow>
            </TableHead>
            <TableBody>
                {children}
            </TableBody>
        </TableView>
    );
};

export default Table;