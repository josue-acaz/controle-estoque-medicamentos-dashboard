import React from "react";

// types
import {BaseRowProps} from "./types";

// components
import Actions from "../../../../components/Table/Actions";

// styles
import {
    TableRow, 
    TableCell,
} from "../../../../components/Table/styles";

export default function BaseRow(props: BaseRowProps) {
    const {base, onEdit} = props;

    return(
        <TableRow>
            <TableCell>{base.name}</TableCell>
            <Actions onEdit={() => onEdit(base.id)} />
        </TableRow>
    );
}