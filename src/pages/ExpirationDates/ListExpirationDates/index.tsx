import React, {useState, useEffect} from "react";
import {formatDatetime} from "../../../tools/dates";
import {EnumDateFormatTypes} from "../../../constants";

// services
import expirationDateService from "../../../services/expiration-date.service";

// models
import Base from "../../../models/Base";
import ExpirationDate from "../../../models/ExpirationDate";

// types
import {TableHeadProps, RowProps} from "../../../components/Task/types";
import {PaginationProps} from "../../../components/Task/Pagination/types";

// components
import Loading from "../../../components/spinners/Loading";
import Task from "../../../components/Task";
import Pagination from "../../../components/Task/Pagination";
import Toolbar from "./Toolbar";

// styles
import {
    GridContainer, 
    GridToolbar, 
    GridContent, 
    GridFooter,
} from "../../../design/grid";
import {View} from "../../../design";
import {
    Status, 
    Name, 
    NameTitle, 
    NameSubtitle,
} from "./styles";

export default function ListExpirationDates() {
    const headLabels: Array<TableHeadProps> = [
        {
            key: "name",
            value: "Nome",
        },
        {
            key: "input_quantity",
            value: "Entradas",
        },
        {
            key: "output_quantity",
            value: "Saídas",
        },
        {
            key: "current_quantity",
            value: "Qtd. Estoque",
        },
        {
            key: "validity",
            value: "Status",
        },
    ];

    const [loading, setLoading] = useState(true);
    const [base, setBase] = useState<Base | null>(null);
    const [rows, setRows] = useState<Array<ExpirationDate>>([]);
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
            const expiration_dates = await expirationDateService.pagination({
                ...pagination,
                base_id: base?.id,
            });
            const {count, rows} = expiration_dates;
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

    function createRows(expiration_dates: Array<ExpirationDate>) {
        const rows: Array<RowProps> = expiration_dates.map(lot => {

            const validity = Number(lot.validity?.days);
            const stock_quantity = Number(lot.current_quantity ? lot.current_quantity : lot.product_input?.quantity);

            const expired = !(validity > 0);
            const out_of_stock = stock_quantity === 0;
            const hide_date = out_of_stock || expired;

            const row: RowProps = {
                id: lot.id,
                cells: [
                    {
                        value: (
                            <Name>
                                <NameTitle>{`#${lot.serial_number.toUpperCase()} ${lot.product_input?.product?.name}`}</NameTitle>
                                <NameSubtitle>Expira em: {hide_date ? "-" : formatDatetime(lot.expiration_date, EnumDateFormatTypes.READABLE_V5)}</NameSubtitle>
                            </Name>
                        ),
                    },
                    {
                        value: lot.product_input?.quantity,
                    },
                    {
                        value: lot.output_quantity ? lot.output_quantity : 0,
                    },
                    {
                        value: stock_quantity,
                    },
                    {
                        value: (
                            <Status days={Number(validity)} stock_quantity={stock_quantity}>
                                {out_of_stock ? "Produto esgotado" : !expired ? `Vence em ${validity} dias` : "Validade vencida"}
                            </Status>
                        ),
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
                <Toolbar title="Prazos de validade" subtitle="Visão por lote" onChange={handleChangeBase} />
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