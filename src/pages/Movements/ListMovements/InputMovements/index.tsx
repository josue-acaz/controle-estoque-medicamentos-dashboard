import React, {useEffect} from "react";

// types
import {InputMovementsProps} from "./types";
import {TableHeadProps} from "../../../../components/Table/types";

// components
import Table from "../../../../components/Table";
import Loading from "../../../../components/spinners/Loading";
import InputMovementRow from "./InputMovementRow";

// styles
import {InputMovementsView} from "./styles";

export default function InputMovements(props: InputMovementsProps) {
    const {loading, inputMovements, limit, offset, page, getInputMovements} = props;
    const headLabels: Array<TableHeadProps> = [
        {
            key: "invoice_number",
            value: "Número da fatura",
        },
        {
            key: "entry_date",
            value: "Data da entrada",
        },
        {
            key: "freight",
            value: "Valor do frete",
        },
        {
            key: "product_inputs",
            value: "Qtd. Itens",
        },
    ];

    useEffect(getInputMovements, [limit, offset, page]);

    return(
        <InputMovementsView>
            {loading ? <Loading /> : (
                <Table headLabels={headLabels}>
                    {inputMovements.map(input_movement => <InputMovementRow input={input_movement} />)}
                </Table>
            )}
        </InputMovementsView>
    );
}
