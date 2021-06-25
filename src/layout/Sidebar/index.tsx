import React from "react";
import {useLocation} from "react-router-dom";

// types
import {SidebarProps} from "./types";

// components
import NavItem from "./NavItem";

// styles
import {SidebarView, List} from "./styles";

export default function Sidebar(props: SidebarProps) {
    const {options, minimized, onOptionClicked} = props;

    const location = useLocation();
    const isActive = (to: string) => to === location.pathname;

    return(
        <SidebarView {...props} minimized={minimized}>
            <List>
                {options.map((option, index) => <NavItem key={index} {...option} active={isActive(option.to)} onClick={onOptionClicked} />)}
            </List>
        </SidebarView>
    );
}
