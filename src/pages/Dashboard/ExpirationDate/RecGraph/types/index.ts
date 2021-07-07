import Product from "../../../../../models/Product";

interface RecGraphProps {
    product: Product;
};

interface RecGraphElementProps {
    color: string;
};

export type {RecGraphProps, RecGraphElementProps};