import React from "react";

// types
import {DoctorRowProps} from "./types";

// components
import Actions from "../../../../components/Table/Actions";

// styles
import {
    TableRow, 
    TableCell,
} from "../../../../components/Table/styles";

export default function DoctorRow(props: DoctorRowProps) {
    const {doctor, onEdit} = props;

    return(
        <TableRow>
            <TableCell>{doctor.name}</TableCell>
            <TableCell>{doctor.email}</TableCell>
            <TableCell>{doctor.phone_number}</TableCell>
            <Actions onEdit={() => onEdit(doctor.id)} />
        </TableRow>
    );
}