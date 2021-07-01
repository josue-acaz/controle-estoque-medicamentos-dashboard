import api from "../api";
import Transfer from "../models/Transfer";
import {PaginationProps} from "../components/Table/Pagination/types";

interface PaginationResponse {
    count: number;
    rows: Array<Transfer>;
};

class TransferService {
    constructor() {}

    async getById(id: string) {
        const response = await api.get(`/transfers/${id}/show`);
        return response.data;
    }

    async create(data: Transfer) {
        const response = await api.post("/transfers", data, {
            headers: {
                origin_base_id: data.origin_base_id,
                product_input_id: data.product_input_id,
                destination_base_id: data.destination_base_id,
            }
        });

        return response.data;
    }

    async update(id: string, data: Transfer) {
        const response = await api.put(`/transfers/${id}/update`, data);
        return response.data;
    }

    async delete(id: string) {
        const response = await api.delete(`/transfers/${id}/delete`);
        return response.data;
    }

    async pagination(params: PaginationProps) {
        const response = await api.get<PaginationResponse>("/transfers/pagination", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }
}

const transferService = new TransferService();
export default transferService;