import {onTabItemClickEvent} from "../TabItem/types";

interface TabItemProps {
    name: string;
    title: string;
    subtitle?: string;
    icon?: any;
    activeColor?: string;
};

interface TabProps {
    selected: number;
    tabs: Array<TabItemProps>;
    onChange(event: onTabItemClickEvent): void;
};

export type {
    TabProps, 
    TabItemProps,
};