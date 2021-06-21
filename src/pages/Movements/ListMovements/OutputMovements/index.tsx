import React, {useEffect} from "react";

// types
import {OutputMovementsProps} from "./types";
import {TableHeadProps} from "../../../../components/Table/types";

// components
import Table from "../../../../components/Table";
import Loading from "../../../../components/spinners/Loading";
import OutputMovementRow from "./OutputMovementRow";

import {OutputMovementsView} from "./styles";

export default function InputMovements(props: OutputMovementsProps) {
    const {loading, outputMovements, limit, offset, page, getOutputMovements} = props;
    const headLabels: Array<TableHeadProps> = [
        {
            key: "date",
            value: "Data da saída",
        },
        {
            key: "aircraft_id",
            value: "Aeronave",
        },
        {
            key: "doctor_id",
            value: "Médico",
        },
        {
            key: "product_outputs",
            value: "Qtd. Saídas"
        },
    ];

    useEffect(getOutputMovements, [limit, offset, page]);

    return(
        <OutputMovementsView>
            {loading ? <Loading /> : (
                <Table
                    withActions={true}
                    headLabels={headLabels} 
                    rowCount={outputMovements.length}
                    numSelected={0}
                    onSelectAllClick={() => {}}
                >
                    {outputMovements.map(output_movement => <OutputMovementRow output={output_movement} />)}
                </Table>
            )}
        </OutputMovementsView>
    );
}
