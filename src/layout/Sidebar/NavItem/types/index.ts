interface NavItemProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    childs: Array<NavItemProps>;
    onClick(): void;
}

interface NavItemActionProps {
    to: string;
    expansive: boolean;
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