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

    @media screen and (max-width: 1200px) {
        padding-left: 10px;
        padding-right: 10px;
    }
`;

const Header = styled.div`
    grid-area: stock-header;
    margin-right: 10px;

    @media screen and (max-width: 1200px) {
        margin-right: 0px;
    }
`;

const List = styled.div`
    grid-area: stock-list;
    margin-right: 10px;
    overflow-y: scroll;
    border: 1px solid #cccccc;
    /**
    border: inset;
    border-width: 3px; */
    @media screen and (max-width: 1200px) {
        margin-right: 0px;
    }
`;

const Footer = styled.div`
    grid-area: stock-footer;
`;

const CloseButton = styled.button`
    top: 10px;
    right: 10px;
    display: none;
    z-index: 500;
    height: 35px;
    padding-right: 15px;
    padding-left: 15px;
    border: none;
    position: absolute;
    color: #444444;
    background-color: #eeeeee;
    border: 1px solid #aaaaaa;
    font-size: 16px;

    &:hover {
        cursor: pointer;
        filter: brightness(.9);
    }

    @media screen and (max-width: 1200px) {
        display: block;
        font-size: 12px;
    }
`;

export {
    StockView,
    List,
    Header,
    Footer,
    CloseButton,
};