interface SidebarOption {
    to: string;
    icon: any;
    label: string;
    childs: Array<SidebarOption>;
};

interface SidebarProps {
    minimized: boolean;
    options: Array<SidebarOption>;
};

export type {SidebarProps};