import React from "react";

// types
import {BaseRowProps} from "./types";

// styles
import {
    TableRow, 
    TableCell,
} from "../../../../components/Table/styles";

export default function BaseRow(props: BaseRowProps) {
    const {base} = props;

    return(
        <TableRow>
            <TableCell>{base.name}</TableCell>
        </TableRow>
    );
}