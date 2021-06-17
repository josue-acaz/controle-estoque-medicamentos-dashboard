import api from "../api";
import Base from "../models/Base";
import {PaginationProps} from "../components/Table/Pagination/types";

interface PaginationResponse {
    count: number;
    rows: Array<Base>;
};

class BaseService {
    constructor() {}

    async getById(id: string) {
        const response = await api.get(`/bases/${id}/show`);
        return response.data;
    }

    async create(data: Base) {
        const response = await api.post("/bases", data, {
            headers: {
                city_id: data.city_id,
            }
        });
        return response.data;
    }

    async update(id: string, data: Base) {
        const response = await api.put(`/bases/${id}/update`, data);
        return response.data;
    }

    async pagination(params: PaginationProps) {
        const response = await api.get<PaginationResponse>("/bases/pagination", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }
}

const baseService = new BaseService();
export default baseService;