import React, {useState, useEffect} from "react";
import {useRouteMatch} from "react-router-dom";
import {EnumActions} from "../../../constants";

// services
import productService from "../../../services/product.service";

// types
import {RouteChildrenProps} from "react-router-dom";
import {TableHeadProps} from "../../../components/Table/types";
import {PaginationProps} from "../../../components/Table/Pagination/types";

// models
import Product from "../../../models/Product";

// components
import ToolbarActions from "../../../components/ToolbarActions";
import Loading from "../../../components/spinners/Loading";
import Table from "../../../components/Table";
import Pagination from "../../../components/Table/Pagination";
import ProductRow from "./ProductRow";

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent,
    GridFooter,
} from "../../../design/grid";
import {View} from "../../../design";

export default function ListCategories(props: RouteChildrenProps) {
    const {history} = props;
    const {path} = useRouteMatch();
    const [loading, setLoading] = useState(true);

    const headLabels: Array<TableHeadProps> = [
        {
            key: "name",
            value: "Nome",
        },
        {
            key: "weight",
            value: "Peso",
        },
        {
            key: "controlled",
            value: "Controlado",
        },
        {
            key: "category",
            value: "Categoria",
        },
        {
            key: "description",
            value: "Descrição",
        },
    ];

    const [products, setProducts] = useState<Array<Product>>([]);
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

    function handleAdd() {
        history.push(`${path}/0/edit`);
    }

    function handleEdit(id: string) {
        history.push(`${path}/${id}/edit`);
    }

    async function index() {
        try {
            const products = await productService.pagination(pagination);
            const {count, rows} = products;
            handleChangePagination("count", count);
            setProducts(rows);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        index();
    }, []);

    return(
        <GridContainer>
            <GridToolbar>
                <ToolbarActions title="Medicamentos/Materiais" action={EnumActions.LIST} onAdd={handleAdd} />
            </GridToolbar>
            <GridContent>
                {loading ? <Loading /> : (
                    <View>
                        <Table headLabels={headLabels} withActions={true}>
                            {products.map(product => <ProductRow product={product} onEdit={handleEdit} />)}
                        </Table>
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
