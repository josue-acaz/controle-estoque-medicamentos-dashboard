interface DrawerProps {
    open: boolean;
    title: string;
    subtitle?: string;
    onClose(): void;
};

interface DrawerViewProps {
    open: boolean;
};

export type {
    DrawerProps,
    DrawerViewProps,
};