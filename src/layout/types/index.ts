interface LayoutViewProps {
    minimized: boolean;
};

interface SidebarOption {
    to: string;
    icon: any;
    label: string;
    childs: Array<SidebarOption>;
};

interface LayoutProps {
    sidebarOptions: Array<SidebarOption>;
};

export type {
    LayoutViewProps,
    LayoutProps,
    SidebarOption,
};