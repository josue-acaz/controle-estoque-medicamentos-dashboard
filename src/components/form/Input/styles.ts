import styled from "styled-components";
import {AdormentProps, InputProps} from "./types";
import {EnumAppColors} from "../../../constants";

const InputView = styled.div`
    position: relative;
`;

const InputElement = styled.input<React.InputHTMLAttributes<HTMLInputElement> & InputProps>`
    height: 45px;
    width: 100%;
    color: #444444;
    font-size: 16px;
    border: none;
    border: 1px solid #c0c0c0;
    padding-left: ${props => props.adormentPosition === "start" ? "35px" : "10px"};
    padding-right: ${props => props.adormentPosition === "end" ? "35px" : "10px"};
`;

const Adorment = styled.span<AdormentProps>`
    position: absolute;
    top: 10px;
    ${props => props.position === "start" ? "left: 10px" : "right: 10px"};
`;

const ErrorText = styled.p`
    font-size: 12px;
    color: ${EnumAppColors.ERROR};
`;

export {
    InputView, 
    InputElement, 
    Adorment, 
    ErrorText,
};