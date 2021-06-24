import React, {useState} from "react";

// models
import MinimumStock from "../../../../models/MinimumStock";

// types
import {MinimumStockRowProps} from "./types";
import {TableHeadProps, RowProps} from "../../../../components/Task/types";

// components
import Task from "../../../../components/Task";
import Toolbar from "../../../../components/Task/Toolbar";

// styles
import {
    ToolbarView, 
    ToolbarItem, 
    ToolbarText,
} from "./styles";
import {View} from "../../../../design";

export default function MinimumStockView(props: MinimumStockRowProps) {
    const {base, numSelected, selected, onEdit, onDelete} = props;
    const [selecteds, setSelecteds] = useState<Array<string>>([]);

    const headLabels: Array<TableHeadProps> = [
        {
            key: "name",
            value: "Item",
        },
        {
            key: "quantity",
            value: "Quantidade",
        },
    ];

    function handleChangeSelecteds(selecteds: Array<string>) {
        setSelecteds(selecteds);
    }

    function createRows(minimum_stocks?: Array<MinimumStock>) {
        if(!minimum_stocks) return [];
        const rows: Array<RowProps> = minimum_stocks.map(minimum_stock => {
            const row: RowProps = {
                id: minimum_stock.id,
                cells: [
                    {
                        value: minimum_stock.product?.name,
                    },
                    {
                        value: minimum_stock.quantity,
                    },
                ]
            };

            return row;
        });

        return rows;
    }

    return(
        <View style={{marginBottom: 15, padding: 0}}>
            <ToolbarView>
                <Toolbar 
                    title={base.name} 
                    search={false}
                    numSelected={selecteds.length} 
                    onDelete={() => onDelete(selecteds)}
                />
            </ToolbarView>
            
            <Task 
                selecteds={selecteds}
                onEditRow={onEdit}
                headLabels={headLabels} 
                rows={createRows(base.minimum_stocks)}
                onChangeSelecteds={handleChangeSelecteds}
            />
        </View>
    );
}