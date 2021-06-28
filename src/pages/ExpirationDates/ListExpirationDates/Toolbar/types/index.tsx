import Base from "../../../../../models/Base";

interface ToolbarProps {
    title: string;
    subtitle?: string;
    onChange(base: Base): void;
};

export type {ToolbarProps};