import api from "../api";
import Stock from "../models/Stock";
import Lot from "../models/Lot";
import {PaginationProps} from "../components/Table/Pagination/types";

interface PaginationResponse {
    count: number;
    rows: Array<Stock>;
};

interface LotPaginationReponse {
    count: number;
    rows: Array<Lot>;
}

class StockService {
    constructor() {}

    async pagination(params: PaginationProps) {
        const response = await api.get<PaginationResponse>("/stocks/pagination", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }

    async lots(params: PaginationProps) {
        const response = await api.get<LotPaginationReponse>("/stocks/lots", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
                base_id: params.base_id,
                product_id: params.product_id,
            },
        });

        return response.data;
    }
}

const stockService = new StockService();
export default stockService;