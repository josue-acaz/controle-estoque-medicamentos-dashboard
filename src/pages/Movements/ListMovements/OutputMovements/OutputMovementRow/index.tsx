import React, {useState} from "react";
import Collapse from "@material-ui/core/Collapse";
import {formatDatetime} from "../../../../../tools/dates";
import {EnumDateFormatTypes, EnumAppColors} from "../../../../../constants";

// types
import {
    OutputMovementRowProps,
    CollapseItemsProps,
} from "./types";
import {TableHeadProps} from "../../../../../components/Table/types";

// components
import Table from "../../../../../components/Table";
import HoverMaskButton from "../../../../../components/HoverMaskButton";

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
    const {product_outputs} = props;

    const headLabels: Array<TableHeadProps> = [
        {
            key: "lot_id",
            value: "Lote",
        },
        {
            key: "product_id",
            value: "Medicamento/Material",
        },
        {
            key: "quantity",
            value: "Qtd",
        },
    ];

    return(
        <CollapseItemsView>
            <Table 
                headLabels={headLabels} 
                color={EnumAppColors.SECONDARY}
                rowCount={product_outputs.length}
                numSelected={0}
                onSelectAllClick={() => {}}
            >
                {product_outputs.map(product_output => (
                    <TableRow>
                        <TableCell>{product_output.lot?.serial_number}</TableCell>
                        <TableCell>{product_output.product?.name}</TableCell>
                        <TableCell>{product_output.quantity}</TableCell>
                    </TableRow>
                ))}
            </Table>
        </CollapseItemsView>
    );
}

export default function OutputMovementRow(props: OutputMovementRowProps) {
    const {output} = props;

    const [open, setOpen] = useState(false);

    function toggleOpen() {
        setOpen(!open);
    }

    return(
        <React.Fragment>
            <TableRow>
                <TableCell>{formatDatetime(output.date, EnumDateFormatTypes.READABLE_V5)}</TableCell>
                <TableCell>{output.aircraft?.prefix}</TableCell>
                <TableCell>{output.doctor?.name}</TableCell>
                <TableCell>
                    <p>{output.product_outputs?.length}</p>
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
                        {output.product_outputs && (
                            <CollapseItems product_outputs={output.product_outputs} />
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
