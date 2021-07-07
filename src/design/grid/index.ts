import styled from "styled-components";
import {GridContainerProps, GridContainerTCFProps} from "./types";

const GridContainer = styled.div<GridContainerProps>`
    display: grid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    grid-template-rows: 55px auto 55px;
    grid-template-areas: "nav nav"
                         "data data"
                         "footer footer";
`;

const GridContainerTCF = styled.div` // Toolbar, Content and Footer
    display: grid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    grid-template-rows: 55px auto 55px;
    grid-template-areas: "nav nav"
                         "data data"
                         "footer footer";
`;

const GridContainerTSC = styled.div<GridContainerTCFProps>` // Toolbar, Sidebar and Content
    display: grid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    grid-template-columns: 1fr 5fr;
    grid-template-rows: 55px auto;
    ${props => props.sidenavVisible ? `
        grid-template-areas: "nav nav"
                             "sidenav data";
    ` : `
        grid-template-areas: "nav nav"
                             "data data";
    `}

    @media screen and (max-width: 1200px) {
        grid-template-areas: "nav nav"
                             "data data";
    }
`;

const GridContainerCF = styled.div` // Content and Footer
    display: grid;
    position: absolute;
    top: 55px;
    bottom: 0;
    left: 0;
    right: 0;
    grid-template-rows: auto 55px;
    grid-template-areas: "data data"
                         "footer footer";
`;

const GridContainerSidenav = styled.div`
    grid-area: sidenav;
    background-color: #ffffff;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.23);
    position: relative;

    @media screen and (max-width: 1200px) {
        position: absolute;
        top: 55px;
        left: 0px;
        bottom: 0px;
        width: 100%;
        z-index: 10;
    }
`;

const GridContainerSidenavView = styled.div`
    display: grid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    grid-template-rows: 55px auto 55px;
    grid-template-areas: "sidenav-toolbar sidenav-toolbar"
                         "sidenav-content sidenav-content"
                         "sidenav-footer sidenav-footer";
`;

const GridContainerSidenavToolbar = styled.div`
    grid-area: sidenav-toolbar;
    border-bottom: 1px solid #eeeeee;
    background-color: #fafafa;
    display: flex;
    align-items: center;

    .icon {
        color: #444444;
    }
`;

const GridContainerSidenavContent = styled.div`
    grid-area: sidenav-content;
    overflow-y: auto;
    position: relative;
    width: 100%;
    z-index: 5;
    background-color: #fafafa;
`;

const GridContainerSidenavFooter = styled.div`
    grid-area: sidenav-footer;
    background-color: #ffffff;
    z-index: 10;
    border-top: 1px solid #eeeeee;
`;

const GridToolbar = styled.nav`
    grid-area: nav;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.23);
    z-index: 10;
    position: relative;
    z-index: 30;
`;

const GridContent = styled.data`
    grid-area: data;
    overflow-y: scroll;
    padding: 10px 0px 10px 10px;
    width: auto;
    position: relative;
    z-index: 5;
`;

const GridFooter = styled.footer`
    grid-area: footer;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: #ffffff;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.23);
    z-index: 10;
`;

export {
    GridContainer,
    GridContainerCF,
    GridContainerTCF,
    GridContainerTSC,
    GridContainerSidenav,
    GridContainerSidenavView,
    GridContainerSidenavContent,
    GridContainerSidenavFooter,
    GridContainerSidenavToolbar,
    GridToolbar,
    GridContent,
    GridFooter,
};
