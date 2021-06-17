import React from "react";

// types
import {ActionsProps} from "./types";

// styles
import {TableCell} from "../styles";
import {ActionsView, ButtonAction} from "./styles";

// icons
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

export default function Actions(props: ActionsProps) {
    const {onEdit} = props;

    return(
        <TableCell>
            <ActionsView>
                <ButtonAction onClick={() => onEdit()}>
                    <EditOutlinedIcon className="icon" />
                </ButtonAction>
            </ActionsView>
        </TableCell>
    );
}
