import React, {useState, useEffect} from "react";
import {onlyNumbers} from "../../../../utils";

// models
import Product from "../../../../models/Product";

// contexts
import {useFeedback} from "../../../../contexts/feedback/feedback.context";

// services
import productService from "../../../../services/product.service";
import minimumStockService from "../../../../services/minimum-stock.service";

// types
import {
    MinimumStockRowProps, 
    QuantityCellProps, 
    onChangeMinimumStockProps,
} from "./types";
import {TableHeadProps, RowProps} from "../../../../components/Task/types";
import {PaginationProps} from "../../../../components/Table/Pagination/types";

// components
import Task from "../../../../components/Task";
import Pagination from "../../../../components/Task/Pagination";
import Toolbar from "../../../../components/Task/Toolbar";
import Loading from "../../../../components/spinners/Loading";
import InputTable from "../../../../components/form/InputTable";

// styles
import {ToolbarView} from "./styles";
import {View} from "../../../../design";
import MinimumStock from "../../../../models/MinimumStock";

function QuantityCell(props: QuantityCellProps) {
    const {id, onChange} = props;
    const [quantity, setQuantity] = useState(props.quantity);

    function handleChange(e: any) {
        const value = onlyNumbers(e.target.value);
        setQuantity(Number(value));
    }

    function handleKeyDown(event: any) {
        if (event.key === "Enter") {
            event.target.blur();
        }
    };

    function handleBlur() {
        console.log("Qtd")
        onChange({id, quantity});
    }

    return(
        <InputTable 
            type="number"
            name="quantity" 
            value={quantity}
            onBlur={handleBlur}
            onChange={handleChange} 
            onKeyDown={handleKeyDown}
            placeholder={quantity.toString()}
        />
    );
}

export default function MinimumStockView(props: MinimumStockRowProps) {
    const {base, numSelected, selected, onEdit, onDelete} = props;

    const feedback = useFeedback();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Array<Product>>([]);
    const [minimumStocks, setMinimumStocks] = useState<Array<MinimumStock>>([]);
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

    const headLabels: Array<TableHeadProps> = [
        {
            key: "name",
            value: "Item",
        },
        {
            key: "quantity",
            value: "Quantidade",
        },
    ];

    function handleChangeSelecteds(selecteds: Array<string>) {
        setSelecteds(selecteds);
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

    async function index() {
        setLoading(true);
        try {
            const products = await productService.pagination(pagination);
            const {rows, count} = products;
            handleChangePagination("count", count);
            setProducts(rows);
            getMinimumStocks();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    async function getMinimumStocks() {
        try {
            const minimum_stocks = await minimumStockService.index(base.id);
            setMinimumStocks(minimum_stocks);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    async function handleChangeQuantity(e: onChangeMinimumStockProps) {
        const {id="", product_id, quantity} = e;
        const edit = id !== "";

        let minimum_stock = new MinimumStock();

        minimum_stock.id = id;
        minimum_stock.base_id = base.id;
        minimum_stock.product_id = product_id;
        minimum_stock.quantity = quantity;

        try {
            const response = edit ?
            await minimumStockService.update(id, minimum_stock) :
            await minimumStockService.create(minimum_stock);

            await getMinimumStocks();
            feedback.open({severity: "success"});
        } catch (error) {
            feedback.open({severity: "error"});
            console.error(error);
        }
    }

    function createRows(products: Array<Product>) {
        const rows: Array<RowProps> = products.map(product => {
            const minimum_stock = minimumStocks.find(minimum_stock => minimum_stock.product_id === product.id);
            const quantity = minimum_stock ? minimum_stock.quantity : 0;

            const row: RowProps = {
                id: product.id,
                cells: [
                    {
                        value: product.name,
                    },
                    {
                        value: (
                            <QuantityCell 
                                id={product.id} 
                                quantity={quantity} 
                                onChange={(props) => {
                                    if(props.quantity !== quantity) {
                                        handleChangeQuantity({
                                            id: minimum_stock?.id,
                                            product_id: props.id,
                                            quantity: props.quantity,
                                        });
                                    }
                                }} 
                            />
                        ),
                    },
                ]
            };

            return row;
        });

        return rows;
    }

    useEffect(() => {index()}, [
        pagination.offset,
        pagination.limit,
        pagination.page,
    ]);

    return(
        <View style={{marginBottom: 15, padding: 0}}>
            <ToolbarView>
                <Toolbar 
                    title={base.name} 
                    search={false}
                    numSelected={selecteds.length} 
                    onDelete={() => {}}
                />
            </ToolbarView>
            
            {loading ? <Loading /> : (
                <Task
                    onEditRow={onEdit}
                    selectable={false}
                    widthActions={false}
                    selecteds={selecteds}
                    headLabels={headLabels} 
                    rows={createRows(products)}
                    onChangeSelecteds={handleChangeSelecteds}
                />
            )}

            <Pagination 
                page={pagination.page} 
                limit={pagination.limit} 
                count={pagination.count} 
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </View>
    );
}