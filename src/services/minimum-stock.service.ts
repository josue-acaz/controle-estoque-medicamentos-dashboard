import api from "../api";
import Base from "../models/Base";
import MinimumStock from "../models/MinimumStock";
import {PaginationProps} from "../components/Table/Pagination/types";

interface PaginationResponse {
    count: number;
    rows: Array<MinimumStock>;
};

interface BasesReponse {
    count: number;
    rows: Array<Base>;
}

class MinimumStockService {
    constructor() {}

    async getById(id: string) {
        const response = await api.get(`/minimum-stocks/${id}/show`);
        return response.data;
    }

    async index(base_id: string) {
        const response = await api.get("/minimum-stocks", {
            headers: {base_id}
        });
        
        return response.data;
    }

    async create(data: MinimumStock) {
        const response = await api.post("/minimum-stocks", data, {
            headers: {
                base_id: data.base_id,
                product_id: data.product_id,
            }
        });

        return response.data;
    }

    async update(id: string, data: MinimumStock) {
        const response = await api.put(`/minimum-stocks/${id}/update`, data);
        return response.data;
    }

    async delete(id: string) {
        const response = await api.delete(`/minimum-stocks/${id}/delete`);
        return response.data;
    }

    async pagination(params: PaginationProps) {
        const response = await api.get<PaginationResponse>("/minimum-stocks/pagination", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }

    async bases(params: PaginationProps) {
        const response = await api.get<BasesReponse>("/minimum-stocks/bases", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }
}

const minimumStockService = new MinimumStockService();
export default minimumStockService;