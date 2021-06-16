import City from "./City";

class Provider {
    id: string = "";
    name: string = "";
    cnpj: string = "";
    city_id: string = "";
    city?: City;
};

export default Provider;