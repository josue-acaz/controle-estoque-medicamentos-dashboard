import api from "../api";
import Provider from "../models/Provider";
import {PaginationProps} from "../components/Table/Pagination/types";

interface PaginationResponse {
    count: number;
    rows: Array<Provider>;
};

class ProviderService {
    constructor() {}

    async create(data: Provider) {
        const response = await api.post("/providers", data, {
            headers: {
                city_id: data.city_id
            },
        });

        return response.data;
    }

    async update(id: string, data: Provider) {
        const response = await api.put(`/providers/${id}/update`, data);
        return response.data;
    }

    async pagination(params: PaginationProps) {
        const response = await api.get<PaginationResponse>("/providers/pagination", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }
}

const providerService = new ProviderService();
export default providerService;