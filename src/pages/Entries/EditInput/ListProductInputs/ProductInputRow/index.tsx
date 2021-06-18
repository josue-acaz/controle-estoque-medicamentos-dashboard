import React from "react";

// types
import {ProductInputRowProps} from "./types";

// components
import Actions from "../../../../../components/Table/Actions";

// styles
import {
    TableRow,
    TableCell,
} from "../../../../../components/Table/styles";

export default function ProductInputRow(props: ProductInputRowProps) {
    const {product_input, onEdit} = props;

    return(
        <TableRow>
            <TableCell>{product_input?.lot?.serial_number}</TableCell>
            <TableCell>{product_input?.lot?.expiration_date}</TableCell>
            <TableCell>{product_input?.base?.name}</TableCell>
            <TableCell>{product_input?.provider?.name}</TableCell>
            <TableCell>{product_input?.product?.name}</TableCell>
            <TableCell>{product_input?.total_quantity}</TableCell>
            <TableCell>{product_input?.unit_price}</TableCell>
            <Actions onEdit={() => onEdit(product_input?.id)} />
        </TableRow>
    );
}