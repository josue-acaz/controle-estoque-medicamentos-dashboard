import api from "../api";
import Category from "../models/Category";
import {PaginationProps} from "../components/Table/Pagination/types";

interface PaginationResponse {
    count: number;
    rows: Array<Category>;
};

class CategoryService {
    constructor() {}

    async getById(id: string) {
        const response = await api.get(`/categories/${id}/show`);
        return response.data;
    }

    async create(data: Category) {
        const response = await api.post("/categories", data);
        return response.data;
    }

    async update(id: string, data: Category) {
        const response = await api.put(`/categories/${id}/update`, data);
        return response.data;
    }

    async pagination(params: PaginationProps) {
        const response = await api.get<PaginationResponse>("/categories/pagination", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }
}

const categoryService = new CategoryService();
export default categoryService;