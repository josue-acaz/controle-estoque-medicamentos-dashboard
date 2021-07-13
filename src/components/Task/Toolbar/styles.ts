import styled from "styled-components";
import {ToolbarViewProps} from "./types";
import {EnumAppColors} from "../../../constants";

const ToolbarView = styled.div<ToolbarViewProps>`
    width: 100%;
    height: 100%;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${props => props.padding === "overview" ? `
        padding-left: 0px;
        padding-right: 10px
    ` : props.padding === "none" ? `
        padding-left: 0px;
        padding-right: 0px
    ` : `
        padding-left: 10px;
        padding-right: 10px
    `};
    color: ${props => props.activeSelection ? "#f50057" : "#444444"};
    background-color: ${props => props.activeSelection ? "rgb(255, 226, 236)" : "#ffffff"};
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
    @media screen and (max-width: 1200px) {
        font-size: 14px;
    }
`;

const Subtitle = styled.p`
    font-size: 14px;
    color: #999999;
`;

const Header = styled.div``;

const NumSelectedText = styled.p`
    font-size: 14px;
    padding-left: 10px;
`;

const NumSelectedActions = styled.div`
`;

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
    Subtitle,
    Header,
    ToolbarView,
    NumSelectedText,
    NumSelectedActions,
    AddButton,
    DeleteButton,
};