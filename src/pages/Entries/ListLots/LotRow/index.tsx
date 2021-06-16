import React from "react";
import {formatDatetime} from "../../../../tools/dates";
import {EnumDateFormatTypes} from "../../../../constants";

// types
import {LotRowProps} from "./types";

// styles
import {
    TableRow,
    TableCell,
} from "../../../../components/Table/styles";

export default function LotRow(props: LotRowProps) {
    const {lot} = props;

    return(
        <TableRow>
            <TableCell>#{lot.serial_number.toUpperCase()}</TableCell>
            <TableCell>{formatDatetime(lot.expiration_date, EnumDateFormatTypes.READABLE_V5)}</TableCell>
            <TableCell>{lot.product_input?.current_quantity}</TableCell>
        </TableRow>
    );
}