import styled from "styled-components";

const TextAreaView = styled.textarea`
    min-width: 100%;
    font-size: 14px;
    border: none;
    border: 1px solid #c0c0c0;
    color: #444444;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    min-height: 100px;
    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
`;

export {TextAreaView};