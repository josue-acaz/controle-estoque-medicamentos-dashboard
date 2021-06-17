import React from "react";

// types
import {ProviderRowProps} from "./types";

// components
import Actions from "../../../../components/Table/Actions";

// styles
import {
    TableRow, 
    TableCell,
} from "../../../../components/Table/styles";

export default function ProviderRow(props: ProviderRowProps) {
    const {provider, onEdit} = props;

    return(
        <TableRow>
            <TableCell>{provider.name}</TableCell>
            <TableCell>{provider.cnpj}</TableCell>
            <TableCell>{provider.city?.full_name}</TableCell>
            <Actions onEdit={() => onEdit(provider.id)} />
        </TableRow>
    );
}