import ProductInput from "./ProductInput";
import ProductOutput from "./ProductOutput";

class Lot {
    [key: string]: any;
    id: string = "";
    serial_number: string = "";
    expiration_date: string = "";
    description?: string;
    product_input?: ProductInput;
    product_outputs?: Array<ProductOutput>;
};

export default Lot;