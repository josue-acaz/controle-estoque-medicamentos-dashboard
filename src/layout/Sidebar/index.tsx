import React from "react";

// types
import {SidebarProps} from "./types";

// components
import NavItem from "./NavItem";

// styles
import {SidebarView, List} from "./styles";

export default function Sidebar(props: SidebarProps) {
    const {options} = props;

    return(
        <SidebarView {...props}>
            <List>
                {options.map((option, index) => (
                    <NavItem 
                        key={index} 
                        to={option.to} 
                        icon={option.icon} 
                        label={option.label}
                        childs={option.childs}
                    />
                ))}
            </List>
        </SidebarView>
    );
}