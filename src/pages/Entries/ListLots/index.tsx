import React, {useState, useEffect} from "react";
import {formatDatetime} from "../../../tools/dates";
import {EnumDateFormatTypes} from "../../../constants";

// models
import Lot from "../../../models/Lot";

// services
import stockService from "../../../services/stock.service";

// types
import {ListLotsProps} from "./types";
import {TableHeadProps, RowProps} from "../../../components/Task/types";
import {PaginationProps} from "../../../components/Task/Pagination/types";

// components
import Loading from "../../../components/spinners/Loading";
import Task from "../../../components/Task";
import Toolbar from "../../../components/Task/Toolbar";
import Pagination from "../../../components/Task/Pagination";

// styles
import {
    GridContainerSlim, 
    GridContent, 
    GridFooter,
} from "../../../design/grid";
import {ListLotsView, ListLotsContent} from "./styles";

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
    const [selecteds, setSelecteds] = useState<Array<string>>([]);
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

    function handleChangeSelecteds(selecteds: Array<string>) {
        setSelecteds(selecteds);
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

    function createRows(lots: Array<Lot>) {
        const rows: Array<RowProps> = lots.map(lot => {
            const row: RowProps = {
                id: lot.id,
                cells: [
                    {
                        value: `#${lot.serial_number.toUpperCase()}`,
                    },
                    {
                        value: formatDatetime(lot.expiration_date, EnumDateFormatTypes.READABLE_V5),
                    },
                    {
                        value: lot.product_input?.current_quantity,
                    },
                ]
            };

            return row;
        });

        return rows;
    }

    return(
        <GridContainerSlim>
            <GridContent style={{overflowY: "hidden"}}>
                <ListLotsView>
                    <ListLotsContent>
                        <Task 
                            selectable={false}
                            fixedHeader={true}
                            widthActions={false}
                            selecteds={selecteds}
                            headLabels={headLabels} 
                            rows={createRows(lots)}
                            onChangeSelecteds={handleChangeSelecteds}
                        />
                    </ListLotsContent>
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