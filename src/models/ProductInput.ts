import Input from "./Input";
import Product from "./Product";
import Base from "./Base";
import Lot from "./Lot";
import Provider from "./Provider";

class ProductInput {
    id: string = "";
    quantity: number = 0;
    current_quantity?: number;
    output_quantity?: number;
    stock_quantity?: number;
    unit_price: number | string = "0,00";
    lot_id: string = "";
    product_id: string = "";
    input_id: string = "";
    base_id: string = "";
    provider_id: string = "";
    input?: Input;
    product?: Product;
    base?: Base;
    provider?: Provider;
    lot?: Lot;
    total?: string = ""; // quando for usado no estoque
};

export default ProductInput;