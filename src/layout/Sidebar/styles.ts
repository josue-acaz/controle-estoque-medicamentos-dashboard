import styled from "styled-components";
import {SidebarProps} from "./types";

const SidebarView = styled.aside<SidebarProps>`
    z-index: 99;
    background-color: #ffffff;
    grid-area: aside;
    justify-content: stretch;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.23);
    flex-direction: column;
    display: ${props => props.minimized ? "none": "flex"};
    justify-content: space-between;
`;

const List = styled.ul``;

export {SidebarView, List};