import styled from "styled-components";

const ActionsView = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const ButtonAction = styled.button`
    padding: 5px;
    border: 1px solid #cccccc;
    margin-right: 10px;

    &:hover {
        cursor: pointer;
        background-color: #cccccc;
    }
`;

export {
    ActionsView, 
    ButtonAction,
};