import React, {useState, useEffect} from "react";
import {useRouteMatch} from "react-router-dom";
import {EnumActions} from "../../../constants";

// services
import productService from "../../../services/product.service";

// models
import Product from "../../../models/Product";

// types
import {RouteChildrenProps} from "react-router-dom";
import {TableHeadProps, RowProps} from "../../../components/Task/types";
import {PaginationProps} from "../../../components/Task/Pagination/types";

// components
import Loading from "../../../components/spinners/Loading";
import Task from "../../../components/Task";
import Toolbar from "../../../components/Task/Toolbar";
import Pagination from "../../../components/Task/Pagination";

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

    const [loading, setLoading] = useState(true);
    const [selecteds, setSelecteds] = useState<Array<string>>([]);
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

    function createRows(products: Array<Product>) {
        const rows: Array<RowProps> = products.map(product => {
            const row: RowProps = {
                id: product.id,
                cells: [
                    {
                        value: product.name,
                    },
                    {
                        value: product.weight,
                    },
                    {
                        value: product.controlled,
                    },
                    {
                        value: product.category?.name,
                    },
                    {
                        value: product.description,
                    }
                ]
            };

            return row;
        });

        return rows;
    }

    return(
        <GridContainer>
            <GridToolbar>
                <Toolbar title="Medicamentos/Materiais" numSelected={selecteds.length} onAdd={handleAdd} />
            </GridToolbar>
            <GridContent>
                {loading ? <Loading /> : (
                    <View>
                        <Task 
                            selecteds={selecteds}
                            onEditRow={handleEdit}
                            headLabels={headLabels} 
                            rows={createRows(products)}
                            onChangeSelecteds={handleChangeSelecteds}
                        />
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
