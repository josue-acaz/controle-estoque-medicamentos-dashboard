import api from "../api";
import ProductOutput from "../models/ProductOutput";
import {PaginationProps} from "../components/Table/Pagination/types";

interface PaginationResponse {
    count: number;
    rows: Array<ProductOutput>;
};

class ProductInputService {
    constructor() {}

    async create(data: ProductOutput) {
        const response = await api.post("/product-outputs", data, {
            headers: {
                output_id: data.output_id, 
                lot_id: data.lot_id,
            }
        });
        return response.data;
    }

    async update(id: string, data: ProductOutput) {
        const response = await api.put(`/product-outputs/${id}/update`, data);
        return response.data;
    }

    async pagination(params: PaginationProps) {
        const response = await api.get<PaginationResponse>("/product-outputs/pagination", {
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