interface OptionProps {
    label: string;
    value: any;
};

interface SelectProps {
    name: string;
    options: Array<OptionProps>;
    onChange(option: OptionProps): void;
};

export type {SelectProps, OptionProps};