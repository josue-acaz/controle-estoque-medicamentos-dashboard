import React, {useState, useEffect} from "react";

// models
import ProductInput from "../../../../models/ProductInput";

// services
import productInputService from "../../../../services/product-input.service";

// types
import {TableHeadProps} from "../../../../components/Table/types";
import {PaginationProps} from "../../../../components/Table/Pagination/types";
import {ListProductInputsProps} from "./types";

// components
import Table from "../../../../components/Table";
import Loading from "../../../../components/spinners/Loading";
import ProductInputRow from "./ProductInputRow";

// styles
import {
    Title,
    ListProductInputsView
} from "./styles";

export default function ListProducts(props: ListProductInputsProps) {
    const {input_id} = props;

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
            value: "Quantidade",
        },
        {
            key: "unit_price",
            value: "Preço unitátio",
        },
    ];

    const [loading, setLoading] = useState(true);
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

    function handleRemoveSelecteds() {

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
    }, [input_id]);

    function handleEdit(id: string) {
        
    }

    return(
        <ListProductInputsView>
            <Title>Relação de itens</Title>
            <Table headLabels={headLabels} withActions={true}>
                {loading ? <Loading /> : productInputs.map(product_input => (
                    <ProductInputRow 
                        onEdit={handleEdit}
                        product_input={product_input} 
                    />
                ))}
            </Table>
        </ListProductInputsView>
    );
}