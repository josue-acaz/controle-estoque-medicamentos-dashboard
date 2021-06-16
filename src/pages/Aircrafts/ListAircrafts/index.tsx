import React, {useState, useEffect} from "react";
import {useRouteMatch} from "react-router-dom";
import {EnumActions} from "../../../constants";

// types
import {RouteChildrenProps} from "react-router-dom";
import {TableHeadProps} from "../../../components/Table/types";
import {PaginationProps} from "../../../components/Table/Pagination/types";

// models
import Aircraft from "../../../models/Aircraft";

// services
import aircraftService from "../../../services/aircraft.service";

// components
import ToolbarActions from "../../../components/ToolbarActions";
import Loading from "../../../components/spinners/Loading";
import Table from "../../../components/Table";
import Pagination from "../../../components/Table/Pagination";
import AircraftRow from "./AircraftRow";

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent, 
    GridFooter,
} from "../../../design/grid";
import {View} from "../../../design";

export default function ListDoctors(props: RouteChildrenProps) {
    const {history} = props;
    const {path} = useRouteMatch();

    const headLabels: Array<TableHeadProps> = [
        {
            key: "name",
            value: "Nome",
        },
        {
            key: "prefix",
            value: "Prefixo",
        },
    ];

    const [loading, setLoading] = useState(true);
    const [aircrafts, setAircrafts] = useState<Array<Aircraft>>([]);
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

    function handleAddDoctor() {
        history.push(`${path}/0/edit`);
    }

    async function index() {
        try {
            const aircrafts = await aircraftService.pagination(pagination);
            const {count, rows} = aircrafts;
            handleChangePagination("count", count);
            setAircrafts(rows);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        index();
    }, []);

    return(
        <GridContainer>
            <GridToolbar>
                <ToolbarActions title="Aeronaves" action={EnumActions.LIST} onAdd={handleAddDoctor} />
            </GridToolbar>
            <GridContent>
                {loading ? <Loading /> : (
                    <View>
                        <Table headLabels={headLabels}>
                            {aircrafts.map(aircraft => <AircraftRow aircraft={aircraft} />)}
                        </Table>
                    </View>
                )}
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
