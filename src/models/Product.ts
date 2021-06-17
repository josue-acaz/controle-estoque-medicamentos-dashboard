import Category from "./Category";
import MinimumStock from "./MinimumStock";

class Product {
    id: string = "";
    name: string = "";
    weight: number = 0;
    description?: string;
    controlled: boolean = false;
    category_id: string = "";
    provider_id: string  = "";
    category?: Category;
    minimum_stocks?: Array<MinimumStock>;
};

export default Product;