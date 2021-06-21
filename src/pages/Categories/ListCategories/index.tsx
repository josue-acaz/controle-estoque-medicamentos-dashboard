import React, {useState, useEffect} from "react";
import {useRouteMatch} from "react-router-dom";

// services
import categoryService from "../../../services/category.service";

// models
import Category from "../../../models/Category";

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
    ];

    const [loading, setLoading] = useState(true);
    const [selecteds, setSelecteds] = useState<Array<string>>([]);
    const [categories, setCategories] = useState<Array<Category>>([]);
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

    function handleChangeSelecteds(selecteds: Array<string>) {
        setSelecteds(selecteds);
    }

    async function index() {
        try {
            const providers = await categoryService.pagination(pagination);
            const {count, rows} = providers;
            handleChangePagination("count", count);
            setCategories(rows);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        index();
    }, []);

    function createRows(categories: Array<Category>) {
        const rows: Array<RowProps> = categories.map(category => {
            const row: RowProps = {
                id: category.id,
                cells: [
                    {
                        value: category.name,
                    },
                ]
            };

            return row;
        });

        return rows;
    }

    return(
        <GridContainer>
            <GridToolbar>
                <Toolbar title="Categorias" numSelected={selecteds.length} onAdd={handleAdd} />
            </GridToolbar>
            <GridContent>
                {loading ? <Loading /> : (
                    <View>
                        <Task 
                            selecteds={selecteds}
                            onEditRow={handleEdit}
                            headLabels={headLabels} 
                            rows={createRows(categories)}
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
