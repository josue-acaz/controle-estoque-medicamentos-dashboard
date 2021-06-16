import React from "react";

// types
import {ProviderRowProps} from "./types";

// styles
import {
    TableRow, 
    TableCell,
} from "../../../../components/Table/styles";

export default function ProviderRow(props: ProviderRowProps) {
    const {provider} = props;

    return(
        <TableRow>
            <TableCell>{provider.name}</TableCell>
            <TableCell>{provider.cnpj}</TableCell>
            <TableCell>{provider.city?.full_name}</TableCell>
        </TableRow>
    );
}