import React, {useState} from "react";
import {EnumActions, EnumAppColors} from "../../../constants";

// types
import {TabItemProps} from "../../../components/Tab/types";
import {PaginationProps} from "../../../components/Table/Pagination/types";

// models
import Input from "../../../models/Input";
import Output from "../../../models/Output";

// services
import movementService from "../../../services/movement.service";

// components
import Tab from "../../../components/Tab";
import Pagination from "../../../components/Table/Pagination";
import ToolbarActions from "../../../components/ToolbarActions";
import TabContent from "../../../components/Tab/TabContent";
import InputMovements from "./InputMovements";
import OutputMovements from "./OutputMovements";

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent,
    GridFooter,
} from "../../../design/grid";
import {View} from "../../../design";
import {ListMovementsView} from "./styles";

// icons
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

export default function ListMovements() {
    const [selectedTab, setSelectedTab] = useState(0);

    const tabs: Array<TabItemProps> = [
        {
            name: "inputs",
            title: "Entradas",
            subtitle: "Lista das ordens de compra com entrada",
            icon: <ArrowDownwardIcon className="input-icon" />,
            activeColor: EnumAppColors.SUCCESS,
        },
        {
            name: "outputs",
            title: "Saídas",
            subtitle: "Lista das ordens de saida com base no lote",
            icon: <ArrowUpwardIcon className="output-icon" />,
            activeColor: EnumAppColors.ERROR,
        }
    ];

    const [loading, setLoading] = useState(false);
    const [inputMovements, setInputMovements] = useState<Array<Input>>([]);
    const [outputMovements, setOutputMovements] = useState<Array<Output>>([]);
    const [pagination, setPagination] = useState<PaginationProps>({
        limit: 10, 
        offset: 0, 
        page: 0,
        count: 0,
        text: "",
        order: "DESC", 
        filter: "name", 
        orderBy: "name",
    });

    function handleChangePagination(key: string, value: any) {
        setPagination(pagination => ({ ...pagination, [key]: value }));
    }

    function handleChangePage(page: number) {
        let offset = 0;
        if(page > 0) {
            offset = pagination.limit;
        }

        handleChangePagination("offset", offset);
        handleChangePagination("page", page);
    }

    function handleChangeRowsPerPage(event: any) {
        const rows_per_page = event.target.value;
        handleChangePagination("limit", rows_per_page);
    }

    function handleChangeTab(e: any) {
        const {name, index} = e;
        setSelectedTab(index);
    }

    async function getInputMovements() {
        setLoading(true);
        try {
            const input_movements = await movementService.inputs(pagination);
            const {count, rows} = input_movements;
            handleChangePagination("count", count);
            setInputMovements(rows);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    async function getOutputMovements() {
        setLoading(true);
        try {
            const output_movements = await movementService.outputs(pagination);
            const {count, rows} = output_movements;
            handleChangePagination("count", count);
            setOutputMovements(rows);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <GridContainer>
            <GridToolbar>
                <ToolbarActions title="Movimentações" action={EnumActions.LIST} />
            </GridToolbar>
            <GridContent>
                <View>
                    <ListMovementsView>
                        <Tab tabs={tabs} selected={selectedTab} onChange={handleChangeTab} />
                        <TabContent index={0} selected={selectedTab}>
                            <InputMovements 
                                loading={loading} 
                                inputMovements={inputMovements} 
                                limit={pagination.limit}
                                offset={pagination.offset}
                                page={pagination.page}
                                getInputMovements={getInputMovements}
                            />
                        </TabContent>
                        <TabContent index={1} selected={selectedTab}>
                            <OutputMovements 
                                loading={loading} 
                                outputMovements={outputMovements} 
                                limit={pagination.limit}
                                offset={pagination.offset}
                                page={pagination.page}
                                getOutputMovements={getOutputMovements}
                            />
                        </TabContent>
                    </ListMovementsView>
                </View>
            </GridContent>
            <GridFooter>
                <Pagination 
                    page={pagination.page} 
                    limit={pagination.limit} 
                    count={pagination.count} 
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </GridFooter>
        </GridContainer>
    );
}
