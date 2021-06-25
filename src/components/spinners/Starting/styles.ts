import styled from "styled-components";
import {EnumAppColors} from "../../../constants";

const StartingView = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
`;

const StartingContent = styled.div`
    @media screen and (max-width: 1200px) {
        padding-left: 10px;
        padding-right: 10px;
    }
`;

const Header = styled.div``;

const Logo = styled.img`
    height: auto;
    width: 160px;
    object-fit: contain;

    @media screen and (max-width: 1200px) {
        width: 140px;
    }
`;

const Title = styled.p`
    color: #666666;
    font-size: 22px;
    font-weight: 500;

    @media screen and (max-width: 1200px) {
        font-size: 14px;
    }
`;

const Subtitle = styled.p`
    font-size: 18px;
    color: #888888;
    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
`;

const Spinner = styled.div`
    display: inline-block;
    width: 80px;
    height: 80px;

    &::after {
        content: " ";
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid ${EnumAppColors.PRIMARY};
        border-color: ${EnumAppColors.PRIMARY} transparent ${EnumAppColors.PRIMARY} transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }

    @keyframes lds-dual-ring {
        0% {
        transform: rotate(0deg);
        }
        100% {
        transform: rotate(360deg);
        }
    }
`;

export {
    StartingView, 
    StartingContent,
    Subtitle,
    Spinner,
    Header,
    Title,
    Logo,
};