import React from "react";

// types
import {CategoryRowProps} from "./types";

// styles
import {
    TableRow, 
    TableCell,
} from "../../../../components/Table/styles";

export default function CategoryRow(props: CategoryRowProps) {
    const {category} = props;

    return(
        <TableRow>
            <TableCell>{category.name}</TableCell>
        </TableRow>
    );
}