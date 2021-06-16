import React from "react";

// types
import {AircraftRowProps} from "./types";

// styles
import {
    TableRow, 
    TableCell,
} from "../../../../components/Table/styles";

export default function AircraftRow(props: AircraftRowProps) {
    const {aircraft} = props;

    return(
        <TableRow>
            <TableCell>{aircraft.name}</TableCell>
            <TableCell>{aircraft.prefix}</TableCell>
        </TableRow>
    );
}
