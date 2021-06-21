import api from "../api";
import Aircraft from "../models/Aircraft";
import {PaginationProps} from "../components/Table/Pagination/types";

interface PaginationResponse {
    count: number;
    rows: Array<Aircraft>;
};

class AircraftService {
    constructor() {}

    async getById(id: string) {
        const response = await api.get(`/aircrafts/${id}/show`);
        return response.data;
    }

    async create(data: Aircraft) {
        const response = await api.post("/aircrafts", data);
        return response.data;
    }

    async update(id: string, data: Aircraft) {
        const response = await api.put(`/aircrafts/${id}/update`, data);
        return response.data;
    }

    async delete(id: string) {
        const response = await api.delete(`/aircrafts/${id}/delete`);
        return response.data;
    }

    async pagination(params: PaginationProps) {
        const response = await api.get<PaginationResponse>("/aircrafts/pagination", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }
}

const aircraftService = new AircraftService();
export default aircraftService;