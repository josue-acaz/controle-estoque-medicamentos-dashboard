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
    grid-template-rows: auto 4fr auto;
    grid-template-areas: "stock-header"
                         "stock-list"
                         "stock-footer";
`;

const Header = styled.div`
    grid-area: stock-header;
    margin-right: 10px;
`;

const List = styled.div`
    grid-area: stock-list;
    margin-right: 10px;
    overflow-y: scroll;
    border: 1px solid #cccccc;
    /**
    border: inset;
    border-width: 3px; */
`;

const Footer = styled.div`
    grid-area: stock-footer;
`;

export {
    StockView,
    List,
    Header,
    Footer,
};