import React, {useState, useEffect} from "react";
import {formatDatetime} from "../../../../tools/dates";
import {EnumDateFormatTypes, EnumAppColors} from "../../../../constants";

// models
import Discard from "../../../../models/Discard";
import ProductInput from "../../../../models/ProductInput";

// contexts
import {useFeedback} from "../../../../contexts/feedback/feedback.context";

// services
import productInputService from "../../../../services/product-input.service";
import discardService from "../../../../services/discard.service";

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
import DiscardAlert from "../../../../components/DiscardAlert";

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

    const [open, setOpen] = useState({
        delete: false,
        discard: false,
        individualDiscard: false,
    });

    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [selecteds, setSelecteds] = useState<Array<string>>([]);
    const [productInputs, setProductInputs] = useState<Array<ProductInput>>([]);
    const [productInput, setProductInput] = useState<ProductInput | null>(null);
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

    function handleOpenAlert(name: string) {
        setOpen(open => ({...open, [name]: true}));
    }

    function handleCloseAlert(name: string) {
        setOpen(open => ({...open, [name]: false}));
    }

    async function handleRemoveSelecteds() {
        handleCloseAlert("delete");
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

    function onDiscard(id: string, expired: boolean) {
        const product_input = productInputs.find(product_input => product_input.id === id);
        
        if(product_input) {
            setProductInput(product_input);

            if(expired) {
                handleOpenAlert("discard");
            } else {
                handleOpenAlert("individualDiscard");
            }
        }
    }

    async function handleDiscard() {
        setProcessing(true);
        handleCloseAlert("discard");

        let discard = new Discard();
        if(productInput) {
            discard.lot_id = productInput.lot_id;
            discard.quantity = productInput.current_quantity ? productInput.current_quantity : productInput.quantity;
            discard.description = "Lote com validade vencida.";
        }

        try {
            const discarded = await discardService.create(discard);
            setProcessing(false);
            feedback.open({severity: "success"});
            index();
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

    async function handleIndividualDiscard(discard: Discard) {
        handleCloseAlert("individualDiscard");
        setProcessing(true);

        try {
            const discarded = await discardService.create(discard);
            setProcessing(false);
            feedback.open({severity: "success"});
            index();
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

            if(current_quantity !== "Esgotado") {
                row.actions = [
                    {
                        label: "Descartar",
                        icon: <DeleteForeverIcon className="icon" />,
                        onClick: (id: string) => onDiscard(id, expired),
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
                open={open.delete} 
                theme="danger" 
                title="Excluir os itens selecionados permanentemente?"
                msg="Esta ação não poderá ser desfeita"
                onConfirm={handleRemoveSelecteds}
                onCancel={() => handleCloseAlert("delete")}
                onClose={() => handleCloseAlert("delete")}
            />
            <Alert 
                open={open.discard} 
                theme="danger" 
                title="Deseja descartar este lote?"
                msg="Esta ação não poderá ser desfeita"
                onConfirm={handleDiscard}
                onCancel={() => handleCloseAlert("discard")}
                onClose={() => handleCloseAlert("discard")}
            />
            {productInput && (
                <DiscardAlert 
                    open={open.individualDiscard} 
                    productInput={productInput}
                    onConfirm={handleIndividualDiscard}
                    onCancel={() => handleCloseAlert("individualDiscard")}
                    onClose={() => handleCloseAlert("individualDiscard")}
                />
            )}
            <Toolbar 
                search={false} 
                padding="overview"
                title="Relação de itens" 
                onDelete={() => handleOpenAlert("delete")}
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