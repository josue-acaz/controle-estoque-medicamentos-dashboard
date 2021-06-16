import React, {useState} from 'react';
import {Link} from "react-router-dom";

// types
import {
    NavItemActionProps, 
    NavItemComponent,
} from "./types";

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

const NavItem: React.FC<NavItemComponent> = ({to, label, icon, childs=[]}) => {
    const expansive = childs.length > 0;

    const [open, setOpen] = useState(false);
    function toggleOpen() {
        setOpen(!open);
    }

    return(
        <NavItemAction to={to} expansive={expansive}>
            <div onClick={toggleOpen} className="menu-item">
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
                    {childs.map((option, index) => (
                        <NavItem 
                            key={index}
                            to={option.to} 
                            icon={option.icon}
                            label={option.label} 
                            childs={option.childs}
                        />
                    ))}
                </div>
            )}
        </NavItemAction>
    );
};

export default NavItem;