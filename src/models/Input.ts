import ProductInput from "./ProductInput";

class Input {
    [key: string]: any;
    id: string = "";
    request_date: string = "";
    entry_date: string = "";
    freight: number | string = "0,00";
    invoice_number: string = "";
    count_product_outputs?: number;
    updated_at?: string = "";
    product_inputs?: Array<ProductInput>;
};

export default Input;