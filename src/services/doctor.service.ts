import api from "../api";
import Doctor from "../models/Doctor";
import {PaginationProps} from "../components/Table/Pagination/types";

interface PaginationResponse {
    count: number;
    rows: Array<Doctor>;
};

class DoctorService {
    constructor() {}

    async create(data: Doctor) {
        const response = await api.post("/doctors", data);
        return response.data;
    }

    async update(id: string, data: Doctor) {
        const response = await api.put(`/doctors/${id}/update`, data);
        return response.data;
    }

    async pagination(params: PaginationProps) {
        const response = await api.get<PaginationResponse>("/doctors/pagination", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }
}

const doctorService = new DoctorService();
export default doctorService;