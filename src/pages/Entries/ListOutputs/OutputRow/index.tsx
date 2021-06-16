import React from "react";
import {formatDatetime} from "../../../../tools/dates";
import {EnumDateFormatTypes} from "../../../../constants";

// types
import {OutputRowProps} from "./types";

// styles
import {
    TableRow, 
    TableCell,
    SelectedRow,
} from "../../../../components/Table/styles";

export default function OutputRow(props: OutputRowProps) {
    const {output, selected, onSelect} = props;

    return(
        <TableRow style={{cursor: "pointer"}} onClick={() => onSelect(output)}>
            <TableCell>{formatDatetime(output.date, EnumDateFormatTypes.READABLE_V5)}</TableCell>
            <TableCell>{output.aircraft?.prefix}</TableCell>
            <TableCell>{output.doctor?.name}</TableCell>
            {selected && <SelectedRow />}
        </TableRow>
    );
}
