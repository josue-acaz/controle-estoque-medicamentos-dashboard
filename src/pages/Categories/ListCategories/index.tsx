import React, {useState, useEffect} from "react";
import {useRouteMatch} from "react-router-dom";
import {EnumActions} from "../../../constants";

// services
import categoryService from "../../../services/category.service";

// types
import {RouteChildrenProps} from "react-router-dom";
import {TableHeadProps} from "../../../components/Table/types";
import {PaginationProps} from "../../../components/Table/Pagination/types";

// models
import Category from "../../../models/Category";

// components
import ToolbarActions from "../../../components/ToolbarActions";
import Loading from "../../../components/spinners/Loading";
import Table from "../../../components/Table";
import Pagination from "../../../components/Table/Pagination";
import CategoryRow from "./CategoryRow";

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
    ];

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

    function handleAddCategory() {
        history.push(`${path}/0/edit`);
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

    return(
        <GridContainer>
            <GridToolbar>
                <ToolbarActions title="Categorias" action={EnumActions.LIST} onAdd={handleAddCategory} />
            </GridToolbar>
            <GridContent>
                {loading ? <Loading /> : (
                    <View>
                        <Table headLabels={headLabels}>
                            {categories.map(category => <CategoryRow category={category} />)}
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
