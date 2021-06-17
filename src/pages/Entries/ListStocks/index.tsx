import React, {useState, useEffect} from "react";
import {EnumAppColors} from "../../../constants";

// models
import Stock from "../../../models/Stock";

// types
import {ListStocksProps} from "./types";
import {TableHeadProps} from "../../../components/Table/types";
import {PaginationProps} from "../../../components/Table/Pagination/types";

// services
import stockService from "../../../services/stock.service";

// components
import Table from "../../../components/Table";
import Pagination from "../../../components/Table/Pagination";
import Circular from "../../../components/spinners/Circular";
import StockRow from "./StockRow";

// styles
import {
    StockView,
    List,
    Footer,
} from "./styles";

export default function ListStocks(props: ListStocksProps) {
    const {refresh, onStockSelected} = props;

    const headLabels: Array<TableHeadProps> = [
        {
            key: "base_id",
            value: "Base",
        },
        {
            key: "product_id",
            value: "Medicamento",
        },
        {
            key: "quantity",
            value: "Qtd",
        },
        {
            key: "minimum_stock_id",
            value: "Qtd. Mínima",
        },
    ];

    const [stocks, setStocks] = useState<Array<Stock>>([]);
    const [loading, setLoading] = useState(true);
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
            const stocks = await stockService.pagination(pagination);
            const {count, rows} = stocks;
            handleChangePagination("count", count);
            setStocks(rows);
            setLoading(false);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        index();
    }, [
        refresh, 
        pagination.limit, 
        pagination.offset, 
        pagination.page,
    ]);

    return(
        <StockView>
            <List>
                <Table headLabels={headLabels} fixedHeader={true}>
                    {loading ? <Circular size={35} color={EnumAppColors.PRIMARY} /> : stocks.map(stock => {
                        const {product_inputs, minimum_stocks} = stock;
                        return(product_inputs?.map(product_input => {

                            const minimum_stock = minimum_stocks?.find(minimum_stock => minimum_stock.base_id === product_input.base_id);

                            return(
                                <StockRow 
                                    name={stock.name} 
                                    key={product_input.id} 
                                    product_input={product_input}
                                    onSelect={onStockSelected}
                                    minimumStock={minimum_stock}
                                />
                            );
                        }));
                    })}
                </Table>
            </List>
            <Footer>
                <Pagination 
                    page={pagination.page} 
                    limit={pagination.limit} 
                    count={pagination.count} 
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Footer>
        </StockView>
    );
}
