import React from "react";

// types
import {ProductOutputRowProps} from "./types";

// components
import Actions from "../../../../../components/Table/Actions";

// styles
import {
    TableRow,
    TableCell,
} from "../../../../../components/Table/styles";

export default function ProductOutputRow(props: ProductOutputRowProps) {
    const {product_output, onEdit} = props;

    return(
        <TableRow>
            <TableCell>{product_output.lot?.serial_number}</TableCell>
            <TableCell>{product_output.product?.name}</TableCell>
            <TableCell>{product_output.quantity}</TableCell>
            <Actions onEdit={() => onEdit(product_output?.id)} />
        </TableRow>
    );
}