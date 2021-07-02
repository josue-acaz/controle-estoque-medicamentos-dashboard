import React, {useState, useEffect} from "react";
import {useRouteMatch} from "react-router-dom";
import {EnumDateFormatTypes} from "../../../constants";
import {formatDatetime} from "../../../tools/dates";

// services
import transferService from "../../../services/transfer.service";

// models
import Transfer from "../../../models/Transfer";

// contexts
import {useFeedback} from "../../../contexts/feedback/feedback.context";

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
import Processing from "../../../components/spinners/Processing";

// icons
import UndoIcon from '@material-ui/icons/Undo';

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent,
    GridFooter,
} from "../../../design/grid";
import {View} from "../../../design";

export default function ListTransfers(props: RouteChildrenProps) {
    const {history} = props;
    const {path} = useRouteMatch();

    const headLabels: Array<TableHeadProps> = [
        {
            key: "serial_number",
            value: "Lote de referência",
        },
        {
            key: "origin_base_id",
            value: "Base de origem"
        },
        {
            key: "destination_base_id",
            value: "Base de destino",
        },
        {
            key: "description",
            value: "Descrição",
        },
        {
            key: "created_at",
            value: "Data da transferência",
        }
    ];

    const feedback = useFeedback();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [lotId, setLotId] = useState("");
    const [selecteds, setSelecteds] = useState<Array<string>>([]);
    const [transfers, setTransfers] = useState<Array<Transfer>>([]);
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

    const currentTransfer = (id: string) => transfers.find(transfer => transfer.id === id);

    function toggleRefresh() {
        setRefresh(!refresh);
    }

    function handleOpenAlert() {
        setOpen(true);
    }

    function handleCloseAlert() {
        setOpen(false);
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

    function handleChangeSelecteds(selecteds: Array<string>) {
        setSelecteds(selecteds);
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
            const transfers = await transferService.pagination(pagination);
            const {count, rows} = transfers;
            handleChangePagination("count", count);
            setTransfers(rows);

            console.log(rows);
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

    function handleReverse(id: string) {
        setLotId(id);
        handleOpenAlert();
    }

    async function handleReverseLot() {
        handleCloseAlert();
        setProcessing(true);

        try {
            const reversed = await transferService.reverse(lotId);
            index();
            setProcessing(false);
            feedback.open({
                severity: "success",
                msg: "Transferência revertida com sucesso!"
            });
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

    function createRows(transfers: Array<Transfer>) {
        const rows: Array<RowProps> = transfers.map(transfer => {
            const row: RowProps = {
                id: transfer.id,
                actions: [
                    {
                        label: "Estornar",
                        icon: <UndoIcon className="icon" />,
                        onClick: handleReverse,
                    }
                ],
                cells: [
                    {
                        value: transfer.product_input?.lot?.serial_number.toUpperCase(),
                    },
                    {
                        value: transfer.origin_base?.name,
                    },
                    {
                        value: transfer.destination_base?.name,
                    },
                    {
                        value: transfer.description,
                    },
                    {
                        value: formatDatetime(transfer.created_at, EnumDateFormatTypes.READABLE_V5),
                    }
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
                title={`Reverter a transferência? *${currentTransfer(lotId)?.product_input?.lot?.serial_number.toUpperCase()}`}
                msg="O lote será revertido a base de origem e este registro será excluido. Esta ação não poderá ser desfeita."
                onConfirm={handleReverseLot}
                onCancel={handleCloseAlert}
                onClose={handleCloseAlert}
            />
            <GridToolbar>
                <Toolbar title="Transferências" numSelected={selecteds.length} onAdd={handleAdd} />
            </GridToolbar>
            <GridContent>
                {processing ? <Processing title="Revertendo lote..." msg="Por favor, aguarde!" /> : (
                    loading ? <Loading /> : (
                    <View>
                        <Task 
                            selectable={false}
                            selecteds={selecteds}
                            onEditRow={handleEdit}
                            headLabels={headLabels} 
                            rows={createRows(transfers)}
                            onChangeSelecteds={handleChangeSelecteds}
                        />
                    </View>
                ))}
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