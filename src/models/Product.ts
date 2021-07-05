import Category from "./Category";
import MinimumStock from "./MinimumStock";
import ProductInput from "./ProductInput";

class Product {
    id: string = "";
    name: string = "";
    weight: number = 0;
    description?: string;
    controlled: boolean = false;
    category_id: string = "";
    provider_id: string  = "";
    expired_quantity?: number | string;
    under_30_days_quantity?: number | string;
    over_30_days_quantity?: number | string;
    category?: Category;
    minimum_stocks?: Array<MinimumStock>;
    product_inputs?: Array<ProductInput>;
};

export default Product;