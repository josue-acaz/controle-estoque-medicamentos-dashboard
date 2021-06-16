import React from "react";

// types
import {DoctorRowProps} from "./types";

// styles
import {
    TableRow, 
    TableCell,
} from "../../../../components/Table/styles";

export default function DoctorRow(props: DoctorRowProps) {
    const {doctor} = props;

    return(
        <TableRow>
            <TableCell>{doctor.name}</TableCell>
            <TableCell>{doctor.email}</TableCell>
            <TableCell>{doctor.phone_number}</TableCell>
        </TableRow>
    );
}