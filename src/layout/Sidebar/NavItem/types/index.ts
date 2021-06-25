import {SidebarOption} from "../../types";

interface NavItemProps {
    to: string;
    icon: any;
    label: string;
    childs: Array<SidebarOption>;
    active?: boolean;
    onClick(): void;
}

interface NavItemActionProps {
    to: string;
    expansive: boolean;
    onClick(): void;
};

interface NavItemComponent {
    to: string;
    icon: React.ReactNode; 
    label: string; 
    childs: Array<NavItemProps>;
}

export type {
    NavItemProps, 
    NavItemActionProps, 
    NavItemComponent,
};