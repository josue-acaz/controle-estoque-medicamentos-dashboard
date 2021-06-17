import Base from "../../../../../models/Base";

interface BaseRowProps {
    base: Base;
    onEdit(id: string): void;
};

export type {BaseRowProps};