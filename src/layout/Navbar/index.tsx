import React from "react";
import logo from "../../assets/img/logo.png";

// contexts
import {useAuth} from "../../contexts/auth/auth.context";

// types
import {NavbarProps} from "./types";

// styles
import {
    NavbarView, 
    CollapseButton,
    NavItem,
    Logo,
} from "./styles";
import {MetroButton} from "../../design";

// icons
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

export default function Navbar(props: NavbarProps) {
    const {signOut} = useAuth();

    function handleSignOut() {
        signOut();
    }

    return(
        <NavbarView>
            <NavItem>
                <CollapseButton onClick={props.onCollapse}>
                    <MenuIcon className="icon" />
                </CollapseButton>
                <Logo src={logo} alt="logo" />
            </NavItem>
            <MetroButton onClick={handleSignOut}>
                <CloseIcon className="icon-primary" />
            </MetroButton>
        </NavbarView>
    );
}