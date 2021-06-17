import MinimumStock from "./MinimumStock";
import City from "./City";

class Base {
    id: string = "";
    name: string = "";
    city_id: string = "";
    city?: City;
    minimum_stocks?: Array<MinimumStock>;
};

export default Base;