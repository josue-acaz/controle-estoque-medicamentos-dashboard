import React, {useState, useEffect} from "react";
import {formatDatetime} from "../../../tools/dates";
import {EnumAppColors, EnumDateFormatTypes} from "../../../constants";

// contexts
import {useFeedback} from "../../../contexts/feedback/feedback.context";

// models
import Input from "../../../models/Input";

// services
import inputService from "../../../services/input.service";

// types
import {ListInputsProps} from "./types";
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
    ListInputsView,
    Header,
    List,
    Footer,
} from "./styles";

export default function ListInputs(props: ListInputsProps) {
    const {refresh, inputSelected, onSelected, onDeleted} = props;
    const headLabels: Array<TableHeadProps> = [
        {
            key: "invoice_number",
            value: "Número da fatura",
        },
        {
            key: "entry_date",
            value: "Data da entrada",
        },
        {
            key: "freight",
            value: "Frete",
        },
        {
            key: "count_product_outputs",
            value: "Nº de saídas",
            textColor: EnumAppColors.ERROR,
        },
    ];

    const feedback = useFeedback();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [selecteds, setSelecteds] = useState<Array<string>>([]);
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
                await inputService.delete(id);
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

    function handleChangeSelecteds(selecteds: Array<string>) {
        setSelecteds(selecteds);
    }

    function createRows(inputs: Array<Input>) {
        const rows: Array<RowProps> = inputs.map(input => {
            const row: RowProps = {
                id: input.id,
                onHoverClick: () => onSelected(input),
                hoverSelected: inputSelected.id === input.id,
                disable_select: input.count_product_outputs ? input.count_product_outputs > 0 : false,
                cells: [
                    {
                        value: input.invoice_number,
                    },
                    {
                        value: formatDatetime(input.entry_date, EnumDateFormatTypes.READABLE_V5),
                    },
                    {
                        value: input.freight,
                    },
                    {
                        value: input.count_product_outputs,
                        color: EnumAppColors.ERROR,
                    }
                ]
            };

            return row;
        });

        return rows;
    }

    return(
        <ListInputsView>
            <Alert 
                open={open} 
                theme="danger" 
                title="Deseja excluir as compras selecionadas?"
                msg="Esta ação não poderá ser desfeita"
                onConfirm={handleRemoveSelecteds}
                onCancel={handleCloseAlert}
                onClose={handleCloseAlert}
            />
            <Header>
                <Toolbar 
                    search={false} 
                    title="Compras" 
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
                        rows={createRows(inputs)}
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
        </ListInputsView>
    );
}
