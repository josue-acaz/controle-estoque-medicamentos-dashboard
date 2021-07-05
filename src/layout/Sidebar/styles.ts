import styled from "styled-components";
import {SidebarProps} from "./types";

const SidebarView = styled.aside<SidebarProps>`
    z-index: 999;
    background-color: #ffffff;
    grid-area: aside;
    justify-content: stretch;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.23);
    flex-direction: column;
    overflow-y: auto;
    display: ${props => props.minimized ? "none": "flex"};
    justify-content: space-between;

    @media screen and (max-width: 1200px) {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 50px;
        left: 0;
        display: ${props => props.minimized ? "none" : "block"};
    }
`;

const List = styled.ul``;

export {SidebarView, List};