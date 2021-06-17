import styled from "styled-components";
import {CircularProps} from "./types";

const CircularView = styled.div<CircularProps>`
    box-sizing: border-box;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    border-radius: 100%;
    position: relative;
`;

const CircleOne = styled.div<CircularProps>`
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: calc(48px / 10) solid transparent;
    border-top-color: ${props => props.color};
    animation: half-circle-spinner-animation 1s infinite;

    @keyframes half-circle-spinner-animation {
      0% {
        transform: rotate(0deg);

      }
      100%{
        transform: rotate(360deg);
      }
    }
`;

const CircleTwo = styled.div<CircularProps>`
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: calc(48px / 10) solid transparent;
    border-bottom-color: ${props => props.color};
    animation: half-circle-spinner-animation 1s infinite;

    @keyframes half-circle-spinner-animation {
      0% {
        transform: rotate(0deg);

      }
      100%{
        transform: rotate(360deg);
      }
    }
`;

export {
    CircularView,
    CircleOne,
    CircleTwo,
};