interface OptionProps {
    label: string;
    value: any;
};

interface SelectProps {
    name: string;
    style?: React.CSSProperties;
    options: Array<OptionProps>;
    initializing?: boolean;
    onChange(option: OptionProps): void;
};

export type {SelectProps, OptionProps};