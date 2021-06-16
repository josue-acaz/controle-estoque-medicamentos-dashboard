import Lot from "./Lot";
import Product from "./Product";
import Output from "./Output";

class ProductOutput {
    id: string = "";
    quantity: number = 1;
    lot_id: string = "";
    product_id: string = "";
    output_id: string = "";
    lot?: Lot;
    product?: Product;
    output?: Output;
};

export default ProductOutput;