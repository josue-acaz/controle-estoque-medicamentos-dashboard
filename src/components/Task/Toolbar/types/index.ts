interface ToolbarProps {
    title: string;
    subtitle?: string;
    search?: boolean;
    padding?: string;
    numSelected: number;
    onAdd?(): void;
    onDelete?(): void;
};

interface ToolbarViewProps {
    activeSelection: boolean;
    padding?: string;
};

export type {ToolbarProps, ToolbarViewProps};