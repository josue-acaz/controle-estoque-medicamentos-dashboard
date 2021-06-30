import React from "react";

// styles
import {
    QtdCellView,
    QtdText,
    MinimumQtd,
    MinimumQtdText,
    QtdCellContent,
} from "./styles";

// types
import {QtdCellProps} from "./types";

export default function QtdCell(props: QtdCellProps) {
    const {quantity, minimum_quantity} = props;

    return(
        <QtdCellView>
            <QtdCellContent>
                <QtdText>{quantity}</QtdText>
                <MinimumQtd>
                    <MinimumQtdText>Mínimo de {minimum_quantity}</MinimumQtdText>
                </MinimumQtd>
            </QtdCellContent>
        </QtdCellView>
    );
}