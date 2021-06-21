import styled from "styled-components";
import {ToolbarProps} from "./types";
import {EnumAppColors} from "../../../constants";

const ToolbarView = styled.div<ToolbarProps>`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: ${props => props.padding === "overview" ? "0px" : "10px"};
    padding-right: 10px;
    color: ${props => props.numSelected > 0 ? "#f50057" : "#444444"};
    background-color: ${props => props.numSelected > 0 ? "rgb(255, 226, 236)" : "#ffffff"};
`;

const ToolbarLeft = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
`;

const ToolbarRight = styled.div``;

const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: #444444;
`;

const NumSelectedText = styled.p`
    font-size: 14px;
`;

const NumSelectedActions = styled.div``;

const AddButton = styled.button`
    border: none;
    height: 40px;
    width: 80px;
    background-color: #ebebeb;
    border-radius: .2rem;
    font-size: 14px;
    color: #444444;

    &:hover {
        cursor: pointer;
        background-color: #aaaaaa;
    }
`;

const DeleteButton = styled.button`
    border: none;
    padding: 0;
    background-color: transparent;

    .icon {
        color: #666666;
    }
    
    &:hover {
        cursor: pointer;

        .icon {
            color: ${EnumAppColors.ERROR};
        }
    }
`;

export {
    Title,
    ToolbarLeft,
    ToolbarRight,
    ToolbarView,
    NumSelectedText,
    NumSelectedActions,
    AddButton,
    DeleteButton,
};