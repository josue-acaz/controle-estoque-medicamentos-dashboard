import React, {useState, useEffect} from "react";
import {useRouteMatch} from "react-router-dom";

// services
import providerService from "../../../services/provider.service";

// types
import {RouteChildrenProps} from "react-router-dom";
import {TableHeadProps, RowProps} from "../../../components/Task/types";
import {PaginationProps} from "../../../components/Task/Pagination/types";

// models
import Provider from "../../../models/Provider";

// components
import Task from "../../../components/Task";
import Toolbar from "../../../components/Task/Toolbar";
import Pagination from "../../../components/Task/Pagination";
import Loading from "../../../components/spinners/Loading";

// styles
import {View} from "../../../design";
import {
    GridContainer, 
    GridToolbar, 
    GridContent, 
    GridFooter,
} from "../../../design/grid";

export default function ListProviders(props: RouteChildrenProps) {
    const {history} = props;
    const {path} = useRouteMatch();

    const headLabels: Array<TableHeadProps> = [
        {
            key: "name",
            value: "Nome",
        },
        {
            key: "cnpj",
            value: "CNPJ",
        },
        {
            key: "city_id",
            value: "Cidade",
        },
    ];

    const [loading, setLoading] = useState(true);
    const [selecteds, setSelecteds] = useState<Array<string>>([]);
    const [providers, setProviders] = useState<Array<Provider>>([]);
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

    function handleAdd() {
        history.push(`${path}/0/edit`);
    }

    function handleEdit(id: string) {
        history.push(`${path}/${id}/edit`);
    }

    function handleSearch(text: string) {
        handleChangePagination("text", text);
    }

    function handleRemoveSelecteds() {

    }

    function handleChangeSelecteds(selecteds: Array<string>) {
        setSelecteds(selecteds);
    }

    async function index() {
        try {
            const providers = await providerService.pagination(pagination);
            const {count, rows} = providers;
            handleChangePagination("count", count);
            setProviders(rows);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {index()}, []);

    function createRows(providers: Array<Provider>) {
        const rows: Array<RowProps> = providers.map(provider => {
            const row: RowProps = {
                id: provider.id,
                cells: [
                    {
                        value: provider.name,
                    },
                    {
                        value: provider.cnpj,
                    },
                    {
                        value: provider.city?.full_name,
                    },
                ]
            };

            return row;
        });

        return rows;
    }

    return(
        <GridContainer>
            <GridToolbar>
                <Toolbar title="Fornecedores" numSelected={selecteds.length} onAdd={handleAdd} />
            </GridToolbar>
            <GridContent>
                {loading ? <Loading /> : (
                    <View>
                        <Task
                            selecteds={selecteds}
                            onEditRow={handleEdit}
                            headLabels={headLabels} 
                            rows={createRows(providers)}
                            onChangeSelecteds={handleChangeSelecteds}
                        />
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
