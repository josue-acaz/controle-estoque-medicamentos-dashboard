import ProductInput from "./ProductInput";
import ProductOutput from "./ProductOutput";

type Validity = {
    days: string;
    hours: string;
    minutes: string;
    milliseconds: string;
};

class Lot {
    [key: string]: any;
    id: string = "";
    serial_number: string = "";
    expiration_date: string = "";
    validity?: Validity;
    current_quantity?: number;
    description?: string;
    product_input?: ProductInput;
    product_outputs?: Array<ProductOutput>;
};

export default Lot;