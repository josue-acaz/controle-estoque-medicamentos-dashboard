import api from "../api";
import Product from "../models/Product";
import {PaginationProps} from "../components/Table/Pagination/types";

interface PaginationResponse {
    count: number;
    rows: Array<Product>;
};

class ProductService {
    constructor() {}

    async getById(id: string) {
        const response = await api.get(`/products/${id}/show`);
        return response.data;
    }

    async create(data: Product) {
        const response = await api.post("/products", data, {
            headers: {
                category_id: data.category_id,
                provider_id: data.provider_id,
            }
        });
        return response.data;
    }

    async update(id: string, data: Product) {
        const response = await api.put(`/products/${id}/update`, data);
        return response.data;
    }

    async pagination(params: PaginationProps) {
        const response = await api.get<PaginationResponse>("/products/pagination", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }
}

const productService = new ProductService();
export default productService;