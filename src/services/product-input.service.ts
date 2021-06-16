import api from "../api";
import Lot from "../models/Lot";
import ProductInput from "../models/ProductInput";
import {PaginationProps} from "../components/Table/Pagination/types";

interface PaginationResponse {
    count: number;
    rows: Array<ProductInput>;
};

class ProductInputService {
    constructor() {}

    async create(data: Lot & ProductInput) {
        const response = await api.post("/product-inputs", data, {
            headers: {
                product_id: data.product_id,
                input_id: data.input_id,
                base_id: data.base_id,
            }
        });

        // lot_id será gerado em conjunto

        return response.data;
    }

    async update(id: string, data: ProductInput) {
        const response = await api.put(`/product-inputs/${id}/update`, data);
        return response.data;
    }

    async pagination(params: PaginationProps) {
        const response = await api.get<PaginationResponse>("/product-inputs/pagination", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }
}

const productInputService = new ProductInputService();
export default productInputService;