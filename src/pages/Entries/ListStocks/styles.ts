import styled from "styled-components";

const StockView = styled.div`
    display: grid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    grid-template-columns: 5fr;
    transition: 2s;
    grid-template-rows: 4fr auto;
    grid-template-areas: "stock-list"
                         "stock-footer";
`;

const List = styled.div`
    grid-area: stock-list;
    border: inset;
    border-width: 3px;
    margin-right: 5px;
    overflow-y: scroll;
`;

const Footer = styled.div`
    grid-area: stock-footer;
`;

export {
    StockView,
    List,
    Footer,
};