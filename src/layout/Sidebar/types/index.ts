interface SidebarOption {
    to: string;
    icon: any;
    label: string;
    childs: Array<SidebarOption>;
    active?: boolean;
};

interface SidebarProps {
    minimized: boolean;
    options: Array<SidebarOption>;
};

export type {SidebarOption, SidebarProps};