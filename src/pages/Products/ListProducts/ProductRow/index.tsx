import React from "react";
import Switch from "@material-ui/core/Switch";

// types
import {ProductRowProps} from "./types";

// styles
import {
    TableRow, 
    TableCell,
} from "../../../../components/Table/styles";

export default function CategoryRow(props: ProductRowProps) {
    const {product} = props;

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
            <TableCell>{product.provider?.name}</TableCell>
            <TableCell>{product.description ? product.description : "Nenhuma"}</TableCell>
        </TableRow>
    );
}