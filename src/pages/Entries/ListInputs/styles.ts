import styled from "styled-components";

const ListInputsView = styled.div`
    display: grid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    grid-template-columns: 5fr;
    transition: 2s;
    grid-template-rows: auto 4fr auto;
    grid-template-areas: "input-header"
                         "input-list"
                         "input-footer";
`;

const Header = styled.div`
    grid-area: input-header;
`;

const List = styled.div`
    grid-area: input-list;
    overflow-y: auto;
    border: 1px solid #cccccc;
    /**border: inset;
    border-width: 3px; */

    @media screen and (max-width: 1200px) {
        border: none;
        border-top: 1px solid #eeeeee;
    }
`;

const Footer = styled.div`
    grid-area: input-footer;
`;


export {
    ListInputsView,
    Header,
    List,
    Footer,
};