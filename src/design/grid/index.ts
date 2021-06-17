import styled from "styled-components";

const GridContainer = styled.div`
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

const GridContainerSlim = styled.div`
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

const GridToolbar = styled.nav`
    grid-area: nav;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: #ffffff;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.23);
    z-index: 10;
`;

const GridContent = styled.data`
    grid-area: data;
    overflow-y: scroll;
    padding: 10px 0px 10px 10px;
    width: auto;
    position: relative;
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
    GridContainerSlim,
    GridToolbar,
    GridContent,
    GridFooter,
};
