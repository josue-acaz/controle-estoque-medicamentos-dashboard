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

    async create(data: ProductInput, lot: Lot) {
        const response = await api.post("/product-inputs", {
            ...data,
            lot,
        }, {
            headers: {
                product_id: data.product_id,
                input_id: data.input_id,
                base_id: data.base_id,
                provider_id: data.provider_id,
            }
        });

        return response.data;
    }

    async update(id: string, data: ProductInput) {
        const response = await api.put(`/product-inputs/${id}/update`, data);
        return response.data;
    }

    async delete(id: string) {
        const response = await api.delete(`/product-inputs/${id}/delete`);
        return response.data;
    }

    async pagination(params: PaginationProps) {
        const response = await api.get<PaginationResponse>("/product-inputs/pagination", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
                input_id: params.input_id,
            },
        });

        return response.data;
    }
}

const productInputService = new ProductInputService();
export default productInputService;