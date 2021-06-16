import api from "../api";
import Input from "../models/Input";
import Output from "../models/Output";
import {PaginationProps} from "../components/Table/Pagination/types";

interface InputPaginationResponse {
    count: number;
    rows: Array<Input>;
};

interface OutputPaginationResponse {
    count: number;
    rows: Array<Output>;
};

class MovementService {
    constructor() {}

    async inputs(params: PaginationProps) {
        const response = await api.get<InputPaginationResponse>("/movements/inputs", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }

    async outputs(params: PaginationProps) {
        const response = await api.get<OutputPaginationResponse>("/movements/outputs", {
            params: {
                limit: params.limit,
                offset: params.offset,
                text: params.text,
            },
        });

        return response.data;
    }
}

const movementService = new MovementService();
export default movementService;