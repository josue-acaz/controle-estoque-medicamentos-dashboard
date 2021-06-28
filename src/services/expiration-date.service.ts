import api from "../api";
import ExpirationDate from "../models/ExpirationDate";
import {PaginationProps} from "../components/Table/Pagination/types";

interface PaginationResponse {
    count: number;
    rows: Array<ExpirationDate>;
};

class ExpirationDateService {
    constructor() {}

    async pagination(params: PaginationProps) {
        console.log({params})
        const response = await api.get<PaginationResponse>("/expiration-dates/pagination", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
                base_id: params.base_id,
            },
        });

        return response.data;
    }
}

const expirationDateService = new ExpirationDateService();
export default expirationDateService;