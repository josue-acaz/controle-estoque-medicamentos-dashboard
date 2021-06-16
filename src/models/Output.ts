import Doctor from "./Doctor";
import Aircraft from "./Aircraft";
import ProductOutput from "./ProductOutput";

class Output {
    [key: string]: any;
    id: string = "";
    date: string = "";
    created_at?: string = "";
    updated_at?: string = "";
    doctor_id: string = "";
    aircraft_id: string = "";
    doctor?: Doctor;
    aircraft?: Aircraft;
    product_outputs?: Array<ProductOutput>;
};

export default Output;