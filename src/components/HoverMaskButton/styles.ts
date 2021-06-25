import styled from "styled-components";
import {HoverMaskButtonContentPorps} from "./types";

const HoverMaskButtonContent = styled.div<HoverMaskButtonContentPorps>`
    display: ${props => props?.styleType === "hover" ? "none" : "flex"};
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: transparent;
`;

const Title = styled.p`
    margin: 0;
    font-size: 16px;
    color: blue;
    text-decoration: underline;

    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
`;

const Icon = styled.div`
    .icon {
        font-size: 22px;
        color: blue;
    }
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 1200px) {
        .icon {
            font-size: 18px;
        }
    }
`;

const HoverMaskButtonView = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        ${HoverMaskButtonContent} {
            cursor: pointer;
            display: flex;
            background-color: rgba(76, 175, 80, .5);
        }
        ${Title} {
            color: #ffffff;
        }
        ${Icon} {
            .icon {
                font-size: 22px;
                color: #ffffff;
            }
        }
    }
`;

const Feedback = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export {
    HoverMaskButtonView,
    HoverMaskButtonContent,
    Feedback,
    Title,
    Icon,
};