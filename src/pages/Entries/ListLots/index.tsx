import React, {useState, useEffect} from "react";

// models
import Lot from "../../../models/Lot";

// services
import stockService from "../../../services/stock.service";

// types
import {ListLotsProps} from "./types";
import {TableHeadProps} from "../../../components/Table/types";
import {PaginationProps} from "../../../components/Table/Pagination/types";

// components
import LotRow from "./LotRow";
import Table from "../../../components/Table";
import Loading from "../../../components/spinners/Loading";
import Pagination from "../../../components/Table/Pagination";

// styles
import {
    GridContainerSlim, 
    GridContent, 
    GridFooter,
} from "../../../design/grid";
import {ListLotsView} from "./styles";

export default function ListLots(props: ListLotsProps) {
    const {product_input} = props;

    const headLabels: Array<TableHeadProps> = [
        {
            key: "serial_number",
            value: "Lote",
        },
        {
            key: "expiration_date",
            value: "Validade",
        },
        {
            key: "quantity",
            value: "Qtd"
        }
    ];

    const [loading, setLoading] = useState(false);
    const [lots, setLots] = useState<Array<Lot>>([]);
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
            const lots = await stockService.lots({
                ...pagination,
                base_id: product_input.base_id,
                product_id: product_input.product_id,
            });
            const {count, rows} = lots;
            handleChangePagination("count", count);
            setLots(rows);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(product_input.id) {
            index();
        }
    }, [product_input]);

    return(
        <GridContainerSlim>
            <GridContent style={{overflowY: "hidden"}}>
                <ListLotsView>
                    <Table headLabels={headLabels}>
                        {loading ? <Loading /> : lots.map(lot => <LotRow lot={lot} />)}
                    </Table>
                </ListLotsView>
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
        </GridContainerSlim>
    );
}