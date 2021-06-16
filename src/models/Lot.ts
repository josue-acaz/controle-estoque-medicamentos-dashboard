import ProductInput from "./ProductInput";

class Lot {
    id: string = "";
    serial_number: string = "";
    expiration_date: string = "";
    description?: string;
    product_input?: ProductInput;
};

export default Lot;