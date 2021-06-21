import api from "../api";
import Input from "../models/Input";
import {PaginationProps} from "../components/Table/Pagination/types";

interface PaginationResponse {
    count: number;
    rows: Array<Input>;
};

class InputService {
    constructor() {}

    async create(data: Input) {
        const response = await api.post("/inputs", data);
        return response.data;
    }

    async update(id: string, data: Input) {
        const response = await api.put(`/inputs/${id}/update`, data);
        return response.data;
    }

    async delete(id: string) {
        const response = await api.delete(`/inputs/${id}/delete`);
        return response.data;
    }

    async pagination(params: PaginationProps) {
        const response = await api.get<PaginationResponse>("/inputs/pagination", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }
}

const inputService = new InputService();
export default inputService;