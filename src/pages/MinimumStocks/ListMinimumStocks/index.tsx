import React, {useState, useEffect} from "react";
import {useRouteMatch} from "react-router-dom";
import {EnumActions} from "../../../constants";

// services
import minimumStockService from "../../../services/minimum-stock.service";

// types
import {RouteChildrenProps} from "react-router-dom";
import {PaginationProps} from "../../../components/Table/Pagination/types";

// models
import Base from "../../../models/Base";

// contexts
import {useFeedback} from "../../../contexts/feedback/feedback.context";

// components
import ToolbarActions from "../../../components/ToolbarActions";
import Loading from "../../../components/spinners/Loading";
import Alert from "../../../components/Alert";
import Pagination from "../../../components/Table/Pagination";
import MinimumStockView from "./MinimumStockView";

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent,
    GridFooter,
} from "../../../design/grid";

export default function ListMinimumStocks(props: RouteChildrenProps) {
    const {history} = props;
    const {path} = useRouteMatch();
    
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
                await minimumStockService.delete(id);
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

    async function index() {
        setLoading(true);
        try {
            const bases = await minimumStockService.bases(pagination);
            const {count, rows} = bases;
            handleChangePagination("count", count);
            setBases(rows);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {index()}, [refresh]);

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
                <ToolbarActions title="Estoque mínimo" action={EnumActions.LIST} onAdd={handleAdd} />
            </GridToolbar>
            <GridContent>
                {loading ? <Loading /> : (
                    bases.map(base => (
                        <MinimumStockView 
                            base={base} 
                            numSelected={0} 
                            selected={false} 
                            onEdit={handleEdit} 
                            onDelete={(selecteds: Array<string>) => {
                                setSelecteds(selecteds);
                                handleOpenAlert();
                            }} 
                        />
                    ))
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
