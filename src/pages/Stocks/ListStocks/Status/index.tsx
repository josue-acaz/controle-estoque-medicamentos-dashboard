import React from "react";

// types
import {StatusProps, StatusOpProps} from "./types";

// styles
import {StatusView, StatusText} from "./styles";

function getStatus(minimum: number, stock: number): StatusOpProps {
    let status: StatusOpProps = {
        label: "",
        value: "",
    };

    const percent = (stock - minimum)/100;
    console.log({stock, minimum});

    if(percent >= 2) {
        status.label = "Estoque confortável";
        status.value = "max";
    }
    else if(percent < 2 && percent >= 1) {
        status.label = "Estoque moderado";
        status.value = "med";
    }
    else if(percent < 1 && percent >= 0) {
        status.label = "Estoque baixo";
        status.value = "low";
    }
    else if(percent < 0) {
        status.label = "Quase sem estoque";
        status.value = "min";
    }

    return status;
}

export default function Status(props: StatusProps) {
    const {stockQuantity, minimumStockQuantity} = props;
    const status = getStatus(minimumStockQuantity, stockQuantity);


    return(
        <StatusView status={status.value}>
            <StatusText>{status.label}</StatusText>
        </StatusView>
    );
}
