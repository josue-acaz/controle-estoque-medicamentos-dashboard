import React, {useState, useEffect} from "react";
import {formatDatetime} from "../../../tools/dates";
import {EnumDateFormatTypes} from "../../../constants";

// contexts
import {useFeedback} from "../../../contexts/feedback/feedback.context";

// models
import Output from "../../../models/Output";

// services
import outputService from "../../../services/output.service";

// types
import {ListOutputsProps} from "./types";
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
    ListOutputsView, 
    Header,
    List, 
    Footer,
} from "./styles";

export default function ListOutputs(props: ListOutputsProps) {
    const {refresh, outputSelected, onSelected, onDeleted} = props;

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

    const feedback = useFeedback();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [selecteds, setSelecteds] = useState<Array<string>>([]);
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
                await outputService.delete(id);
            }
            
            feedback.open({severity: "success"});
            setProcessing(false);
            setSelecteds([]);
            onDeleted();
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

    function handleChangeSelecteds(selecteds: Array<string>) {
        setSelecteds(selecteds);
    }

    function createRows(outputs: Array<Output>) {
        const rows: Array<RowProps> = outputs.map(output => {
            const row: RowProps = {
                id: output.id,
                onHoverClick: () => onSelected(output),
                hoverSelected: outputSelected.id === output.id,
                cells: [
                    {
                        value: formatDatetime(output.date, EnumDateFormatTypes.READABLE_V5),
                    },
                    {
                        value: output.aircraft?.prefix,
                    },
                    {
                        value: output.doctor?.name,
                    }
                ]
            };

            return row;
        });

        return rows;
    }

    return(
        <ListOutputsView>
            <Alert 
                open={open} 
                theme="danger" 
                title="Deseja excluir as saídas selecionadas?"
                msg="Esta ação irá reverter a quantidade de saída para cada lote. Esta ação não poderá ser desfeita, deseja continuar?"
                onConfirm={handleRemoveSelecteds}
                onCancel={handleCloseAlert}
                onClose={handleCloseAlert}
            />
            <Header>
                <Toolbar 
                    search={false} 
                    title="Saídas" 
                    padding="overview"
                    numSelected={selecteds.length}
                    onDelete={handleOpenAlert}
                />
            </Header>
            <List>
                {loading ? <Loading /> : (
                    <Task 
                        fixedHeader={true}
                        widthActions={false}
                        selecteds={selecteds}
                        headLabels={headLabels} 
                        rows={createRows(outputs)}
                        onChangeSelecteds={handleChangeSelecteds}
                    />
                )}
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