import React from "react";

// types
import {CategoryRowProps} from "./types";

// components
import Actions from "../../../../components/Table/Actions";

// styles
import {
    TableRow, 
    TableCell,
} from "../../../../components/Table/styles";

export default function CategoryRow(props: CategoryRowProps) {
    const {category, onEdit} = props;

    return(
        <TableRow>
            <TableCell>{category.name}</TableCell>
            <Actions onEdit={() => onEdit(category.id)} />
        </TableRow>
    );
}