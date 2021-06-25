import styled from "styled-components";
import {EnumAppColors} from "../../../constants";
import {TabItemActiveBarProps} from "./types";

const TabItemView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    &:hover {
        cursor: pointer;
        background-color: #eeeeee;
    }
`;

const TabItemContent = styled.div`
    margin-top: 5px;
    margin-left: 15px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const Icon = styled.div`
    margin-right: 5px;
`;

const Title = styled.p`
    font-size: 18px;
    color: #444444;
    font-weight: 600;

    @media screen and (max-width: 1200px) {
        font-size: 14px;
    }
`;

const Subtitle = styled.p`
    font-size: 16px;
    color: #666666;

    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
`;

const ActiveBar = styled.div<TabItemActiveBarProps>`
    position: absolute;
    height: 5px;
    width: 100%;
    bottom: 0px;
    background-color: ${props => props.active ? EnumAppColors.PRIMARY : "#cccccc"};
`;

export {
    TabItemView, 
    TabItemContent,
    Title, 
    Subtitle,
    ActiveBar,
    Header,
    Icon,
};