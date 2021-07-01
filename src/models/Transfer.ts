import Base from "./Base";
import ProductInput from "./ProductInput";

class Transfer {
    id: string = "";
    quantity: string = "";
    description: string = "";
    origin_base_id: string = "";
    destination_base_id: string = "";
    product_input_id: string = "";
    origin_base?: Base;
    destination_base?: Base;
    product_input?: ProductInput;
};

export default Transfer;