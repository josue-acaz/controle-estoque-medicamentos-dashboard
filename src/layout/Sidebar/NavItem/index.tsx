import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";

// types
import {
    NavItemActionProps, 
    NavItemComponent,
} from "./types";
import {SidebarOption} from "../types";

// icons
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// styles
import "./styles.css";

const NavItemAction: React.FC<NavItemActionProps> = ({children, to, expansive}) => (
    expansive ? <div className="nav-item-action">{children}</div> :
    <Link className="nav-item-action" to={to}>{children}</Link>
);

function NavItemChilds(props: SidebarOption) {
    const {to, icon, label, childs, active} = props;

    return(
        <NavItem 
            to={to} 
            icon={icon}
            label={label} 
            active={active}
            childs={childs}
        />
    );
}

export default function NavItem(props: SidebarOption) {
    const {to, childs, icon, label, active} = props;
    const expansive = childs.length > 0;
    
    const location = useLocation();
    const isActive = (to: string) => to === location.pathname;

    const [open, setOpen] = useState(false);
    function toggleOpen() {
        setOpen(!open);
    }

    return(
        <NavItemAction to={to} expansive={expansive}>
            <div onClick={toggleOpen} className={`menu-item ${active ? "menu-item-active" : ""}`}>
                <div className="left">
                    <div className="col-item">
                        <div className="to-center">
                            {icon}
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="to-center">
                            <p className="label">{label}</p>
                        </div>
                    </div>
                </div>
                {expansive && (
                    <div className="right">
                        <IconButton size="small" onClick={toggleOpen}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </div>
                )}
            </div>
            {expansive && open && (
                <div className="submenus">
                    {childs.map((option, index) => <NavItemChilds key={index} {...option} active={isActive(option.to)} />)}
                </div>
            )}
        </NavItemAction>
    );
}