import Product from "./Product";
import MinimumStock from "./MinimumStock";

class Stock extends Product {
    input_quantity: number = 0;
    output_quantity: number = 0;
    amount: number = 0;
    current_quantity: number = 0;
    minimum_stock_quantity: number = 0;
};

export default Stock;