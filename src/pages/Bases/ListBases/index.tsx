import React, {useState, useEffect} from "react";
import {useRouteMatch} from "react-router-dom";

// services
import baseService from "../../../services/base.service";

// contexts
import {useFeedback} from "../../../contexts/feedback/feedback.context";

// models
import Base from "../../../models/Base";

// types
import {RouteChildrenProps} from "react-router-dom";
import {TableHeadProps, RowProps} from "../../../components/Task/types";
import {PaginationProps} from "../../../components/Task/Pagination/types";

// components
import Loading from "../../../components/spinners/Loading";
import Task from "../../../components/Task";
import Toolbar from "../../../components/Task/Toolbar";
import Pagination from "../../../components/Task/Pagination";
import Alert from "../../../components/Alert";

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent,
    GridFooter,
} from "../../../design/grid";
import {View} from "../../../design";

export default function ListBases(props: RouteChildrenProps) {
    const {history} = props;
    const {path} = useRouteMatch();

    const headLabels: Array<TableHeadProps> = [
        {
            key: "name",
            value: "Nome",
        },
    ];

    const feedback = useFeedback();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [bases, setBases] = useState<Array<Base>>([]);
    const [selecteds, setSelecteds] = useState<Array<string>>([]);
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

    function toggleRefresh() {
        setRefresh(!refresh);
    }

    function handleOpenAlert() {
        setOpen(true);
    }

    function handleCloseAlert() {
        setOpen(false);
    }

    async function handleRemoveSelecteds() {
        handleCloseAlert();
        setProcessing(true);
        
        try {
            for (let index = 0; index < selecteds.length; index++) {
                const id = selecteds[index];
                await baseService.delete(id);
            }
            feedback.open({severity: "success"});
            setProcessing(false);
            setSelecteds([]);
            toggleRefresh();
        } catch (error) {
            setProcessing(false);
            if(error.response) {
                feedback.open({
                    severity: "error",
                    msg: error.response.data.msg,
                });
            } else {
                feedback.open({severity: "error"});
            }
        }
    }

    function handleChangePagination(key: string, value: any) {
        setPagination(pagination => ({ ...pagination, [key]: value }));
    }

    function handleSearch(text: string) {
        handleChangePagination("text", text);
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

    function handleChangeSelecteds(selecteds: Array<string>) {
        setSelecteds(selecteds);
    }

    async function index() {
        setLoading(true);
        try {
            const bases = await baseService.pagination(pagination);
            const {count, rows} = bases;
            handleChangePagination("count", count);
            setBases(rows);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {index()}, [
        refresh,
        pagination.limit,
        pagination.offset,
        pagination.page,
    ]);

    function createRows(bases: Array<Base>) {
        const rows: Array<RowProps> = bases.map(base => {
            const row: RowProps = {
                id: base.id,
                cells: [
                    {
                        value: base.name,
                    },
                ]
            };

            return row;
        });

        return rows;
    }

    return(
        <GridContainer>
            <Alert 
                open={open} 
                theme="danger" 
                title="Excluir selecionados?"
                msg="Esta ação não poderá ser desfeita"
                onConfirm={handleRemoveSelecteds}
                onCancel={handleCloseAlert}
                onClose={handleCloseAlert}
            />
            <GridToolbar>
                <Toolbar title="Bases" numSelected={selecteds.length} onAdd={handleAdd} onDelete={handleOpenAlert} />
            </GridToolbar>
            <GridContent>
                {loading ? <Loading /> : (
                    <View>
                        <Task 
                            selecteds={selecteds}
                            onEditRow={handleEdit}
                            headLabels={headLabels} 
                            rows={createRows(bases)}
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
