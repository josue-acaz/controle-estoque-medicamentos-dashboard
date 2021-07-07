import axios from "axios";

const api = axios.create({
    baseURL: "https://medicamentos-api.charterpiquiatuba.com.br",
});

export default api;
