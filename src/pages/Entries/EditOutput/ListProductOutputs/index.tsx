import React, {useState, useEffect} from "react";

// models
import ProductOutput from "../../../../models/ProductOutput";

// services
import productOutputService from "../../../../services/product-output.service";

// types
import {TableHeadProps} from "../../../../components/Table/types";
import {PaginationProps} from "../../../../components/Table/Pagination/types";
import {ListProductOutputsProps} from "./types";

// components
import Table from "../../../../components/Table";
import Loading from "../../../../components/spinners/Loading";
import ProductOutputRow from "./ProductOutputRow";

// styles
import {
    Title,
    ListProductOutputsView,
} from "./styles";

export default function ListProductOutputs(props: ListProductOutputsProps) {
    const {output_id} = props;

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

    const [loading, setLoading] = useState(true);
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
    }, [output_id]);

    function handleEdit(id: string) {
        
    }

    return(
        <ListProductOutputsView>
            <Title>Relação de itens</Title>
            <Table headLabels={headLabels} withActions={true}>
                {loading ? <Loading /> : productOutputs.map(product_output => (
                    <ProductOutputRow 
                        onEdit={handleEdit}
                        product_output={product_output} 
                    />
                ))}
            </Table>
        </ListProductOutputsView>
    );
}
