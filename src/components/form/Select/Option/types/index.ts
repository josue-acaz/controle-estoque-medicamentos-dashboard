interface OptionProps {
    index: number;
    label: string;
    value: any;
    cursor: number;
    onSelected(option: any): void;
};

interface OptionViewProps {
    active: boolean;
};

export type {OptionProps, OptionViewProps};