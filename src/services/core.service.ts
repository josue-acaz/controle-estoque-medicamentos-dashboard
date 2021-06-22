import api from "../api";

class CoreService {
    constructor() {}

    async currentDatetime() {
        const response = await api.get(`/current-datetime`);
        return response.data;
    }
}

const coreService = new CoreService();
export default coreService;