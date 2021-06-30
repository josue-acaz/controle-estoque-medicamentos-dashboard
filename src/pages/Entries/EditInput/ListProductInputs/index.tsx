import React, {useState, useEffect} from "react";
import {formatDatetime} from "../../../../tools/dates";
import {EnumDateFormatTypes, EnumAppColors} from "../../../../constants";

// models
import ProductInput from "../../../../models/ProductInput";

// contexts
import {useFeedback} from "../../../../contexts/feedback/feedback.context";

// services
import productInputService from "../../../../services/product-input.service";

// icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// types
import {ListProductInputsProps, OutputQuantityCellProps} from "./types";
import {TableHeadProps, RowProps} from "../../../../components/Task/types";
import {PaginationProps} from "../../../../components/Task/Pagination/types";

// components
import Task from "../../../../components/Task";
import Toolbar from "../../../../components/Task/Toolbar";
import Alert from "../../../../components/Alert";

// styles
import {
    ListProductInputsView,
    ListProductInputsContent,
    OutputQuantityCellView,
    OutputNumber,
    OutputQuantity,
} from "./styles";
import {currency} from "../../../../utils";

function OutputQuantityCell(props: OutputQuantityCellProps) {

    return(
        <OutputQuantityCellView>
            <OutputNumber>{props.number}</OutputNumber>
            <OutputQuantity>Qtd: {props.quantity ? props.quantity : 0}</OutputQuantity>
        </OutputQuantityCellView>
    );
}

export default function ListProducts(props: ListProductInputsProps) {
    const {input_id, onEdit, onDeleted} = props;
    const feedback = useFeedback();

    const headLabels: Array<TableHeadProps> = [
        {
            key: "serial_number",
            value: "Nº do Lote",
        },
        {
            key: "expiration_date",
            value: "Validade",
        },
        {
            key: "base_id",
            value: "Base de destino",
        },
        {
            key: "provider_id",
            value: "Fornecedor",
        },
        {
            key: "product_id",
            value: "Referência",
        },
        {
            key: "quantity",
            value: "Qtd. inicial",
        },
        {
            key: "current_quantity",
            value: "Qtd. restante",
        },
        {
            key: "unit_price",
            value: "Preço unitátio",
        },
        {
            key: "product_output_id",
            value: "Nº de saídas",
            textColor: EnumAppColors.ERROR,
        }
    ];

    const [open, setOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [selecteds, setSelecteds] = useState<Array<string>>([]);
    const [productInputs, setProductInputs] = useState<Array<ProductInput>>([]);
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
                await productInputService.delete(id);
            }
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
            const product_inputs = await productInputService.pagination({
                input_id,
                ...pagination,
            });
            const {count, rows} = product_inputs;
            console.log(rows);
            handleChangePagination("count", count);
            setProductInputs(rows);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        index();
    }, [input_id, refresh]);

    function handleEdit(id: string) {
        const product_input = productInputs.find(product_input => product_input.id === id);
        if(product_input) {
            onEdit(product_input);
        }
    }

    function handleChangeSelecteds(selecteds: Array<string>) {
        setSelecteds(selecteds);
    }

    function createRows(product_inputs: Array<ProductInput>) {
        const rows: Array<RowProps> = product_inputs.map(product_input => {

            const validity = Number(product_input.lot ? product_input.lot.validity?.days : 1);
            const expired = !(validity > 0);

            const current_quantity = product_input.current_quantity ? Number(product_input.current_quantity) === 0 ? "Esgotado" : product_input.current_quantity : product_input.quantity;
            const expiration_date = current_quantity === "Esgotado" ? "-" : expired ? "Fora da validade" : product_input?.lot?.expiration_date ? formatDatetime(product_input?.lot?.expiration_date, EnumDateFormatTypes.READABLE_V5) : "-";

            let row: RowProps = {
                id: product_input.id,
                disable_select: !!product_input.lot?.product_outputs?.length,
                cells: [
                    {
                        value: product_input?.lot?.serial_number,
                    },
                    {
                        value: expiration_date === "Fora da validade" ? <p style={{fontWeight: "bold", color: EnumAppColors.ERROR}}>{expiration_date}</p> : expiration_date,
                    },
                    {
                        value: product_input?.base?.name,
                    },
                    {
                        value: product_input?.provider?.name,
                    },
                    {
                        value: product_input?.product?.name,
                    },
                    {
                        value: product_input.quantity,
                    },
                    {
                        value: current_quantity === "Esgotado" ? <p style={{fontWeight: "bold", color: EnumAppColors.ERROR}}>{current_quantity}</p> : current_quantity,
                    },
                    {
                        value: currency(Number(product_input?.unit_price)),
                    },
                    {
                        value: <OutputQuantityCell number={product_input.lot?.product_outputs?.length} quantity={product_input.output_quantity} />,
                    }
                ]
            };

            if(expired && current_quantity !== "Esgotado") {
                row.actions = [
                    {
                        label: "Descartar",
                        icon: <DeleteForeverIcon className="icon" />,
                        onClick: (id: string) => {},
                    }
                ];
            }

            return row;
        });

        return rows;
    }

    return(
        <ListProductInputsView>
            <Alert 
                open={open} 
                theme="danger" 
                title="Deseja excluir os itens selecionados?"
                msg="Esta ação não poderá ser desfeita"
                onConfirm={handleRemoveSelecteds}
                onCancel={handleCloseAlert}
                onClose={handleCloseAlert}
            />
            <Toolbar 
                search={false} 
                padding="overview"
                title="Relação de itens" 
                onDelete={handleOpenAlert}
                numSelected={selecteds.length}
            />
            <ListProductInputsContent>
                <Task 
                    onEditRow={handleEdit}
                    selecteds={selecteds}
                    headLabels={headLabels} 
                    rows={createRows(productInputs)}
                    onChangeSelecteds={handleChangeSelecteds}
                />
            </ListProductInputsContent>
        </ListProductInputsView>
    );
}