import React, {useState, useEffect} from "react";

// models
import Stock from "../../../models/Stock";

// types
import {ListStocksProps} from "./types";
import {TableHeadProps, RowProps} from "../../../components/Task/types";
import {PaginationProps} from "../../../components/Task/Pagination/types";
import {OptionProps} from "../../../components/form/Select/types";

// components
import Task from "../../../components/Task";
import Toolbar from "../../../components/Task/Toolbar";
import Pagination from "../../../components/Task/Pagination";
import Select from "../../../components/form/Select";
import Loading from "../../../components/spinners/Loading";
import QtdCell from "./QtdCell";

// services
import stockService from "../../../services/stock.service";
import baseService from "../../../services/base.service";

// styles
import {
    StockView,
    Header,
    List,
    Footer,
    CloseButton,
} from "./styles";
import Base from "../../../models/Base";

export default function ListStocks(props: ListStocksProps) {
    const {refresh, onStockSelected, onClose} = props;

    const headLabels: Array<TableHeadProps> = [
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
    const [selectedBase, setSelectedBase] = useState<Base | null>(null);
    const [bases, setBases] = useState<Array<Base>>([]);
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

    async function index(base_id: string) {
        setLoading(true);
        try {
            const stocks = await stockService.pagination({
                ...pagination,
                base_id,
            });
            const {count, rows} = stocks;
            handleChangePagination("count", count);
            setStocks(rows);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBases();
    }, []);

    useEffect(() => {
        if(selectedBase) {
            index(selectedBase.id);
        }
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

            const current_quantity = stock.current_quantity ? stock.current_quantity : stock.input_quantity;

            const row: RowProps = {
                id: stock.id,
                hoverTitle: "Mostrar estoque completo",
                onHoverClick: () => {
                    if(selectedBase) {
                        onStockSelected({
                            base_name: selectedBase?.name,
                            product_name: stock.name,
                            base_id: selectedBase.id,
                            product_id: stock.id,
                        });
                    }
                },
                cells: [
                    {
                        value: stock.name,
                    },
                    {
                        value: <QtdCell quantity={current_quantity} minimum_quantity={stock.minimum_stock_quantity} />,
                    }
                ],
            };

            return row;
        });

        return rows;
    }

    async function getBases() {
        try {
            const bases = await baseService.pagination(pagination);
            const {count, rows} = bases;
            setBases(rows);
            const selected_base = rows[0];
            setSelectedBase(selected_base);
            index(selected_base.id);
        } catch (error) {
            setLoading(false);
        }
    }

    function handleChangeBase(e: OptionProps) {
        const {value} = e;
        const base = bases.find(base => base.id === value);
        if(base) {
            setSelectedBase(base);
            index(base.id);
        }
    }

    return(
        <StockView>
            <CloseButton onClick={onClose}>Fechar</CloseButton>
            <Header>
                <Toolbar 
                    padding="none" 
                    search={false} 
                    title="Estoque" 
                    subtitle="Lotes dentro da data de validade"
                    numSelected={selecteds.length}
                >
                    <Select name="base_id" onChange={handleChangeBase} options={bases.map(base => ({
                        value: base.id,
                        label: base.name,
                    }))} />
                </Toolbar>
            </Header>
            <List>
                {loading ? <Loading /> : (
                    <Task 
                        selectable={false}
                        fixedHeader={true}
                        widthActions={false}
                        selecteds={selecteds}
                        headLabels={headLabels} 
                        rows={createRows(stocks)}
                        onChangeSelecteds={handleChangeSelecteds}
                    />
                )}
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