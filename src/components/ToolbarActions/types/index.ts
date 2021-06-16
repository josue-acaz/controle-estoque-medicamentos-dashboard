interface ToolbarRouteProps {
    path: string;
    label: string;
}

interface ToolbarActionsProps {
    title?: string;
    action: "list" | "add";
    routes?: Array<ToolbarRouteProps>;
    Custom?: any;
    onAdd?(): void;
    onGoBack?(): void;
};

export type {ToolbarActionsProps, ToolbarRouteProps};