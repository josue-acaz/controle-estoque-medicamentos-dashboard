import api from "../api";
import Output from "../models/Output";
import {PaginationProps} from "../components/Table/Pagination/types";

interface PaginationResponse {
    count: number;
    rows: Array<Output>;
};

class OutputService {
    constructor() {}

    async create(data: Output) {
        const response = await api.post("/outputs", data, {
            headers: {
                aircraft_id: data.aircraft_id,
                doctor_id: data.doctor_id,
            }
        });
        return response.data;
    }

    async update(id: string, data: Output) {
        const response = await api.put(`/outputs/${id}/update`, data);
        return response.data;
    }

    async pagination(params: PaginationProps) {
        const response = await api.get<PaginationResponse>("/outputs/pagination", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }
}

const outputService = new OutputService();
export default outputService;