import React, {useState, useEffect} from "react";
import {currency} from "../../../utils";

// models
import Base from "../../../models/Base";
import Stock from "../../../models/Stock";

// types
import {TableHeadProps, RowProps} from "../../../components/Task/types";
import {PaginationProps} from "../../../components/Task/Pagination/types";

// services
import stockService from "../../../services/stock.service";

// components
import Loading from "../../../components/spinners/Loading";
import Task from "../../../components/Task";
import Pagination from "../../../components/Task/Pagination";
import Toolbar from "./Toolbar";
import Status from "./Status";

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent, 
    GridFooter,
} from "../../../design/grid";
import {View} from "../../../design";

export default function ListStocks() {
    const headLabels: Array<TableHeadProps> = [
        {
            key: "name",
            value: "Nome",
        },
        {
            key: "minimum_stock",
            value: "Estoque mínimo",
        },
        {
            key: "inputs",
            value: "Entradas",
        },
        {
            key: "outputs",
            value: "Saídas",
        },
        {
            key: "current_quantity",
            value: "Estoque atual",
        },
        {
            key: "status",
            value: "Status",
        },
        {
            key: "amount",
            value: "Total de gastos",
        },
    ];

    const [loading, setLoading] = useState(true);
    const [base, setBase] = useState<Base | null>(null);
    const [rows, setRows] = useState<Array<Stock>>([]);
    const [pagination, setPagination] = useState<PaginationProps>({
        limit: 10, 
        offset: 0, 
        page: 0,
        count: 0,
        text: "",
        order: "DESC", 
        filter: "name", 
        orderBy: "updated_at",
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
            const stocks = await stockService.pagination({
                ...pagination,
                base_id: base?.id,
            });
            const {count, rows} = stocks;
            handleChangePagination("count", count);
            setRows(rows);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(base) {
            index();
        }
    }, [
        base,
        pagination.limit,
        pagination.offset,
        pagination.page,
    ]);

    function createRows(stocks: Array<Stock>) {
        const rows: Array<RowProps> = stocks.map(stock => {
            console.log(stock);
            const current_quantity = Number(stock.current_quantity ? stock.current_quantity : stock.input_quantity);
            const minimum_stock_quantity = Number(stock.minimum_stock_quantity ? stock.minimum_stock_quantity : 0);

            const row: RowProps = {
                id: stock.id,
                cells: [
                    {
                        value: stock.name,
                    },
                    {
                        value: minimum_stock_quantity,
                    },
                    {
                        value: stock.input_quantity,
                    },
                    {
                        value: stock.output_quantity ? stock.output_quantity : 0,
                    },
                    {
                        value: current_quantity,
                    },
                    {
                        value: <Status minimumStockQuantity={minimum_stock_quantity} stockQuantity={current_quantity} />,
                    },
                    {
                        value: currency(stock.amount),
                    }
                ]
            };

            return row;
        });

        return rows;
    }

    function handleChangeBase(base: Base) {
        setBase(base);
    }

    return(
        <GridContainer>
            <GridToolbar>
                <Toolbar title="Geral" subtitle="Visão por base" onChange={handleChangeBase} />
            </GridToolbar>
            <GridContent>
                {loading ? <Loading /> : (
                    <React.Fragment>
                        <View>
                            <Task
                                selecteds={[]}
                                selectable={false}
                                widthActions={false}
                                headLabels={headLabels} 
                                rows={createRows(rows)}
                                onChangeSelecteds={() => {}}
                            />
                        </View>
                    </React.Fragment>
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