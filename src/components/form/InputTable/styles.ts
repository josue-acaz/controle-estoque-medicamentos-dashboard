import styled from "styled-components";

const InputTableView = styled.div``;

const InputTableElement = styled.input`
    border: none;
    width: 100%;
    color: #444444;
    background-color: transparent;
    font-size: 14px;
    outline: none;
    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
`;

export {
    InputTableView,
    InputTableElement,
};