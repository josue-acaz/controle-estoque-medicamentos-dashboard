import Base from "./Base";
import ProductInput from "./ProductInput";

class Transfer {
    id: string = "";
    description: string = "";
    origin_base_id: string = "";
    destination_base_id: string = "";
    product_input_id: string = "";
    created_at: string = "";
    updated_at: string = "";
    origin_base?: Base;
    destination_base?: Base;
    product_input?: ProductInput;
};

export default Transfer;