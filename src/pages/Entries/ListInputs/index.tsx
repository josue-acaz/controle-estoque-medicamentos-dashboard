import React, {useState, useEffect} from "react";
import {EnumAppColors} from "../../../constants";

// models
import Input from "../../../models/Input";

// services
import inputService from "../../../services/input.service";

// types
import {TableHeadProps} from "../../../components/Table/types";
import {PaginationProps} from "../../../components/Table/Pagination/types";
import {ListInputsProps} from "./types";

// components
import Table from "../../../components/Table";
import Pagination from "../../../components/Table/Pagination";
import Circular from "../../../components/spinners/Circular";
import InputRow from "./InputRow";

// styles
import {
    ListInputsView,
    List,
    Footer,
} from "./styles";

export default function ListInputs(props: ListInputsProps) {
    const {refresh, inputSelected, onInputSelected} = props;
    const headLabels: Array<TableHeadProps> = [
        {
            key: "invoice_number",
            value: "Número da fatura",
        },
        {
            key: "request_date",
            value: "Data da solicitação",
        },
        {
            key: "entry_date",
            value: "Data da entrada",
        },
        {
            key: "freight",
            value: "Frete",
        },
    ];

    const [loading, setLoading] = useState(true);
    const [inputs, setInputs] = useState<Array<Input>>([]);
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
            const inputs = await inputService.pagination(pagination);
            const {count, rows} = inputs;
            handleChangePagination("count", count);
            setInputs(rows);
            setLoading(false);
        } catch (error) {
            
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
        <ListInputsView>
            <List>
                <Table headLabels={headLabels} fixedHeader={true}>
                    {loading ? <Circular size={35} color={EnumAppColors.PRIMARY} /> : (
                        inputs.map(input => (
                            <InputRow 
                                input={input} 
                                selected={input.id === inputSelected.id} 
                                onSelect={onInputSelected} 
                            />
                        ))
                    )}
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
        </ListInputsView>
    );
}
