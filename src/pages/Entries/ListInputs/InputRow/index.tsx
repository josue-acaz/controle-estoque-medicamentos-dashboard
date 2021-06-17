import React from "react";
import {currency} from "../../../../utils";
import {formatDatetime} from "../../../../tools/dates";
import {EnumDateFormatTypes} from "../../../../constants";

// types
import {InputRowProps} from "./types";

// styles
import {
    TableRow, 
    TableCell,
    SelectedRow,
} from "../../../../components/Table/styles";

export default function InputRow(props: InputRowProps) {
    const {input, selected, onSelect} = props;

    return(
        <TableRow style={{cursor: "pointer"}} onClick={() => onSelect(input)}>
            <TableCell>{input.invoice_number}</TableCell>
            <TableCell>{input.entry_date ? formatDatetime(input.entry_date, EnumDateFormatTypes.READABLE_V5) : "-"}</TableCell>
            <TableCell>{currency(Number(input.freight))}</TableCell>
            {selected && <SelectedRow />}
        </TableRow>
    );
}
