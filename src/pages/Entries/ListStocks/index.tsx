import React, {useState, useEffect} from "react";

// models
import Stock from "../../../models/Stock";

// types
import {ListStocksProps} from "./types";
import {TableHeadProps, RowProps} from "../../../components/Task/types";
import {PaginationProps} from "../../../components/Task/Pagination/types";

// components
import Task from "../../../components/Task";
import Toolbar from "../../../components/Task/Toolbar";
import Pagination from "../../../components/Task/Pagination";
import QtdCell from "./QtdCell";

// services
import stockService from "../../../services/stock.service";

// styles
import {
    StockView,
    Header,
    List,
    Footer,
    CloseButton,
} from "./styles";

export default function ListStocks(props: ListStocksProps) {
    const {refresh, onStockSelected, onClose} = props;

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
    ];

    const [loading, setLoading] = useState(true);
    const [stocks, setStocks] = useState<Array<Stock>>([]);
    const [selecteds, setSelecteds] = useState<Array<string>>([]);
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
            const stocks = await stockService.bases(pagination);
            const {count, rows} = stocks;
            handleChangePagination("count", count);
            setStocks(rows);
            setLoading(false);
        } catch (error) {
            setLoading(false);
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

    function handleChangeSelecteds(selecteds: Array<string>) {
        setSelecteds(selecteds);
    }

    function createRows(stocks: Array<Stock>) {
        const rows: Array<RowProps> = stocks.map(stock => {
            let row: RowProps = {
                id: "",
                cells: []
            };

            const {product_inputs, minimum_stocks} = stock;
            product_inputs?.forEach(product_input => {

                const minimum_stock = minimum_stocks?.find(minimum_stock => minimum_stock.base_id === product_input.base_id);
                row = {
                    id: stock.id,
                    hoverTitle: "Mostrar estoque completo",
                    onHoverClick: () => onStockSelected(product_input),
                    cells: [
                        {
                            value: product_input.base?.name,
                        },
                        {
                            value: stock.name,
                        },
                        {
                            value: <QtdCell quantity={product_input.stock_quantity} minimum_quantity={minimum_stock?.quantity} />,
                        }
                    ],
                };
            });


            return row;
        });

        return rows;
    }

    return(
        <StockView>
            <CloseButton onClick={onClose}>Fechar</CloseButton>
            <Header>
                <Toolbar 
                    padding="overview" 
                    search={false} 
                    title="Estoque" 
                    subtitle="Lotes dentro da data de validade"
                    numSelected={selecteds.length}
                />
            </Header>
            <List>
                <Task 
                    selectable={false}
                    fixedHeader={true}
                    widthActions={false}
                    selecteds={selecteds}
                    headLabels={headLabels} 
                    rows={createRows(stocks)}
                    onChangeSelecteds={handleChangeSelecteds}
                />
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