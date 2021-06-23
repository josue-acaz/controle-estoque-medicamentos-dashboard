import React, {useState, useEffect} from "react";

// models
import ProductOutput from "../../../../models/ProductOutput";

// contexts
import {useFeedback} from "../../../../contexts/feedback/feedback.context";

// services
import productOutputService from "../../../../services/product-output.service";

// types
import {ListProductOutputsProps} from "./types";
import {TableHeadProps, RowProps} from "../../../../components/Task/types";
import {PaginationProps} from "../../../../components/Task/Pagination/types";

// components
import Task from "../../../../components/Task";
import Toolbar from "../../../../components/Task/Toolbar";
import Alert from "../../../../components/Alert";

// styles
import {
    ListProductOutputsView,
    ListProductOutputsContent,
} from "./styles";

export default function ListProductOutputs(props: ListProductOutputsProps) {
    const {output_id, onEdit, onDeleted} = props;

    const headLabels: Array<TableHeadProps> = [
        {
            key: "serial_number",
            value: "Nº do Lote",
        },
        {
            key: "product_id",
            value: "Referência",
        },
        {
            key: "quantity",
            value: "Qtd"
        },
    ];

    const feedback = useFeedback();
    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [selecteds, setSelecteds] = useState<Array<string>>([]);
    const [productOutputs, setProductOutputs] = useState<Array<ProductOutput>>([]);
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
            const deleted = await Promise.all(selecteds.map(id => productOutputService.delete(id)));
            feedback.open({severity: "success"});
            setProcessing(false);
            setSelecteds([]);
            onDeleted();
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

    async function index() {
        setLoading(true);
        try {
            const product_outputs = await productOutputService.pagination({
                output_id,
                ...pagination,
            });
            const {count, rows} = product_outputs;
            handleChangePagination("count", count);
            setProductOutputs(rows);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        index();
    }, [output_id, refresh]);

    function handleEdit(id: string) {
        const product_output = productOutputs.find(product_output => product_output.id === id);
        if(product_output) {
            onEdit(product_output);
        }
    }

    function handleChangeSelecteds(selecteds: Array<string>) {
        setSelecteds(selecteds);
    }

    function createRows(product_outputs: Array<ProductOutput>) {
        const rows: Array<RowProps> = product_outputs.map(product_output => {
            const row: RowProps = {
                id: product_output.id,
                cells: [
                    {
                        value: product_output.lot?.serial_number,
                    },
                    {
                        value: product_output.product?.name,
                    },
                    {
                        value: product_output.quantity,
                    },
                ]
            };

            return row;
        });

        return rows;
    }
    
    return(
        <ListProductOutputsView>
            <Alert 
                open={open} 
                theme="danger" 
                title="Deseja excluir os itens selecionados?"
                msg="A quantidade será revertida para o lote de origem. Esta ação não poderá ser desfeita."
                onConfirm={handleRemoveSelecteds}
                onCancel={handleCloseAlert}
                onClose={handleCloseAlert}
            />
            <Toolbar 
                search={false} 
                padding="overview"
                title="Relação de itens" 
                numSelected={selecteds.length}
                onDelete={handleOpenAlert}
            />
            <ListProductOutputsContent>
                <Task 
                    widthActions={false}
                    selecteds={selecteds}
                    onEditRow={handleEdit}
                    headLabels={headLabels} 
                    rows={createRows(productOutputs)}
                    onChangeSelecteds={handleChangeSelecteds}
                />
            </ListProductOutputsContent>
        </ListProductOutputsView>
    );
}
