import Base from "../../../../../models/Base";

interface ToolbarProps {
    title: string;
    subtitle?: string;
    onChange(base: Base): void;
    onChangeSidenavVisible(): void;
};

export type {ToolbarProps};