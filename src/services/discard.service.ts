import api from "../api";
import Discard from "../models/Discard";

class DiscardService {
    constructor() {}

    async create(data: Discard) {
        const response = await api.post("/discards", data, {
            headers: {
                lot_id: data.lot_id
            },
        });

        return response.data;
    }
}

const discardService = new DiscardService();
export default discardService;
