import React from "react";

// types
import {AircraftRowProps} from "./types";

// components
import Actions from "../../../../components/Table/Actions";

// styles
import {
    TableRow, 
    TableCell,
} from "../../../../components/Table/styles";

export default function AircraftRow(props: AircraftRowProps) {
    const {aircraft, onEdit} = props;

    return(
        <TableRow>
            <TableCell>{aircraft.name}</TableCell>
            <TableCell>{aircraft.prefix}</TableCell>
            <Actions onEdit={() => onEdit(aircraft.id)} />
        </TableRow>
    );
}
