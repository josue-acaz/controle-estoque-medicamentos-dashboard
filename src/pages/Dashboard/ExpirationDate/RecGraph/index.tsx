import React from "react";
import {EnumAppColors} from "../../../../constants";

// types
import {RecGraphProps} from "./types";

// styles
import {
    RecGraphView, 
    RecGraphElement, 
    RecGraphItem, 
    RecGraphLabel,
    RecGraphTitle,
} from "./styles";

export default function RecGraph(props: RecGraphProps) {
    const {product} = props;

    const data = [
        {
            label: "Entradas",
            color: EnumAppColors.SUCCESS,
            quantity: Number(product.input_quantity),
        },
        {
            label: "Saidas",
            color: EnumAppColors.ERROR,
            quantity: Number(product.output_quantity),
        },
        {
            label: "Estoque atual",
            color: EnumAppColors.PRIMARY,
            quantity: product.stock_quantity ? Number(product.stock_quantity) : Number(product.input_quantity),
        },
    ];

    return(
        <RecGraphView>
            {data.map(entry => (
                <RecGraphItem>
                    <RecGraphTitle>{entry.label}</RecGraphTitle>
                    <RecGraphElement color={entry.color}>
                        <RecGraphLabel>{entry.quantity}</RecGraphLabel>
                    </RecGraphElement>
                </RecGraphItem>
            ))}
        </RecGraphView>
    );
}