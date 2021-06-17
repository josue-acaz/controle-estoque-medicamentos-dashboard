import Category from "../../../../../models/Category";

interface CategoryRowProps {
    category: Category;
    onEdit(id: string): void;
};

export type {CategoryRowProps};