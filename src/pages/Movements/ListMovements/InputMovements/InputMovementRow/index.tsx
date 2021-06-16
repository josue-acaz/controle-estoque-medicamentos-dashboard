import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import {formatDatetime} from "../../../../../tools/dates";
import {currency} from "../../../../../utils";
import {
    EnumDateFormatTypes,
    EnumDatetimeFormatTypes,
    EnumAppColors,
} from "../../../../../constants";

// types
import {InputMovementRowProps, CollapseItemsProps} from "./types";
import {TableHeadProps} from "../../../../../components/Table/types";

// components
import HoverMaskButton from "../../../../../components/HoverMaskButton";
import Table from "../../../../../components/Table";

// styles
import {
    TableRow, 
    TableCell,
} from "../../../../../components/Table/styles";
import {CollapseItemsView} from "./styles";

// icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

function CollapseItems(props: CollapseItemsProps) {
    const {product_inputs} = props;

    const headLabels: Array<TableHeadProps> = [
        {
            key: "lot_id",
            value: "Lote",
        },
        {
            key: "base_id",
            value: "Base",
        },
        {
            key: "product_id",
            value: "Medicamento/Material",
        },
        {
            key: "quantity",
            value: "Qtd",
        },
        {
            key: "unit_price",
            value: "Preço unitário",
        },
    ];

    return(
        <CollapseItemsView>
            <Table headLabels={headLabels} color={EnumAppColors.SECONDARY}>
                {product_inputs.map(product_input => (
                    <TableRow>
                        <TableCell>{product_input.lot?.serial_number}</TableCell>
                        <TableCell>{product_input.base?.name}</TableCell>
                        <TableCell>{product_input.product?.name}</TableCell>
                        <TableCell>{product_input.current_quantity}</TableCell>
                        <TableCell>{currency(Number(product_input.unit_price))}</TableCell>
                    </TableRow>
                ))}
            </Table>
        </CollapseItemsView>
    );
}

export default function InputMovementRow(props: InputMovementRowProps) {
    const {input} = props;
    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(!open);
    }

    return(
        <React.Fragment>
            <TableRow>
                <TableCell>{input.invoice_number.toUpperCase()}</TableCell>
                <TableCell>{formatDatetime(input.request_date, EnumDateFormatTypes.READABLE_V5)}</TableCell>
                <TableCell>{formatDatetime(input.entry_date, EnumDateFormatTypes.READABLE_V5)}</TableCell>
                <TableCell>{currency(Number(input.freight))}</TableCell>
                <TableCell>
                    <p>{input.product_inputs?.length}</p>
                    <HoverMaskButton 
                        title={open ? "Ocultar itens" : "Mostrar itens"} 
                        icon={open ? <ExpandLessIcon className="icon" /> : <ExpandMoreIcon className="icon"/>} 
                        onClick={toggleOpen}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={12} style={{padding: 0}}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {input.product_inputs && (
                            <CollapseItems product_inputs={input.product_inputs} />
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
