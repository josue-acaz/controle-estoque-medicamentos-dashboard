import Base from "./Base";
import Product from "./Product";

class MinimumStock {
    id: string = "";
    quantity: number = 1;
    base_id: string = "";
    product_id: string = "";
    product?: Product;
    base?: Base;
};

export default MinimumStock;