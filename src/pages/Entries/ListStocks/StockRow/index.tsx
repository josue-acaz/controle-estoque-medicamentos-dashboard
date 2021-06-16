import React from "react";

// types
import {StockRowProps} from "./types";

// components
import HoverMaskButton from "../../../../components/HoverMaskButton";

// styles
import {
    TableRow, 
    TableCell,
} from "../../../../components/Table/styles";

// icons
import DetailsIcon from "@material-ui/icons/Details";

export default function StockRow(props: StockRowProps) {
    const {name, minimumStock, product_input, onSelect} = props;

    return(
        <React.Fragment>
            <TableRow onClick={() => onSelect(product_input)}>
                <TableCell>{product_input.base?.name}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{product_input.total}</TableCell>
                <TableCell>{minimumStock ? minimumStock.quantity : "-"}</TableCell>
                <HoverMaskButton title="Detalhar" icon={<DetailsIcon className="icon" />} />
            </TableRow>
        </React.Fragment>
    );
}