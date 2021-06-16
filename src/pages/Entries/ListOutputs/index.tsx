import React, {useState, useEffect} from "react";
import {EnumAppColors} from "../../../constants";

// models
import Output from "../../../models/Output";

// services
import outputService from "../../../services/output.service";

// types
import {ListOutputsProps} from "./types";
import {TableHeadProps} from "../../../components/Table/types";
import {PaginationProps} from "../../../components/Table/Pagination/types";

// components
import Table from "../../../components/Table";
import Pagination from "../../../components/Table/Pagination";
import Circular from "../../../components/spinners/Circular";
import OutputRow from "./OutputRow";

// styles
import {ListOutputsView, List, Footer} from "./styles";

export default function ListOutputs(props: ListOutputsProps) {
    const {refresh, outputSelected, onOutputSelected} = props;

    const headLabels: Array<TableHeadProps> = [
        {
            key: "request_date",
            value: "Data da saída",
        },
        {
            key: "aircraft_id",
            value: "Aeronave",
        },
        {
            key: "doctor_id",
            value: "Médico",
        }
    ];

    const [loading, setLoading] = useState(true);
    const [outputs, setOutputs] = useState<Array<Output>>([]);
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

    async function index() {
        setLoading(true);
        try {
            const outputs = await outputService.pagination(pagination);
            const {count, rows} = outputs;
            handleChangePagination("count", count);
            setOutputs(rows);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        index();
    }, [
        refresh, 
        pagination.limit, 
        pagination.offset, 
        pagination.page,
    ]);

    return(
        <ListOutputsView>
            <List>
                <Table headLabels={headLabels} fixedHeader={true}>
                    {loading ? (
                        <Circular 
                            size={35} 
                            color={EnumAppColors.PRIMARY}
                        />
                    ) : outputs.map(output => (
                        <OutputRow 
                            output={output} 
                            selected={output.id === outputSelected.id}
                            onSelect={onOutputSelected}
                        />
                    ))}
                </Table>
            </List>
            <Footer>
                <Pagination 
                    page={pagination.page} 
                    limit={pagination.limit} 
                    count={pagination.count} 
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Footer>
        </ListOutputsView>
    );
}