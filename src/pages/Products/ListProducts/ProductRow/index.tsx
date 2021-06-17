import React from "react";
import Switch from "@material-ui/core/Switch";

// types
import {ProductRowProps} from "./types";

// components
import Actions from "../../../../components/Table/Actions";

// styles
import {
    TableRow, 
    TableCell,
} from "../../../../components/Table/styles";

export default function CategoryRow(props: ProductRowProps) {
    const {product, onEdit} = props;

    return(
        <TableRow>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.weight}</TableCell>
            <TableCell>
                <Switch
                    checked={product.controlled}
                    onChange={() => {}}
                    color="secondary"
                    name="controlled"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                />
            </TableCell>
            <TableCell>{product.category?.name}</TableCell>
            <TableCell>{product.description ? product.description : "Nenhuma"}</TableCell>
            <Actions onEdit={() => onEdit(product.id)} />
        </TableRow>
    );
}