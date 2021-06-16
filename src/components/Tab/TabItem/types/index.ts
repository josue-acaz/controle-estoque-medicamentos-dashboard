import React from "react";

interface onTabItemClickEvent {
    name: string;
    index: number;
};

interface TabItemProps {
    index: number;
    name: string;
    title: string;
    subtitle?: string;
    active: boolean;
    activeColor: string;
    icon?: React.ReactNode;
    onClick(event: onTabItemClickEvent): void;
};

interface TabItemActiveBarProps {
    active: boolean;
    activeColor: string;
};

export type {
    TabItemProps, 
    TabItemActiveBarProps,
    onTabItemClickEvent,
};