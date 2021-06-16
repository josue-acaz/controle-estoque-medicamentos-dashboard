import styled from "styled-components";
import {EnumAppColors} from "../constants";
import {ViewProps} from "./types";

const Form = styled.form`
    margin-top: 15px;
`;

const InputGroup = styled.div`
    margin-bottom: 10px;
`;

const InputLabel = styled.label``;

const PrimaryButton = styled.button`
    border: none;
    height: 45px;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 0px;
    background-color: ${EnumAppColors.PRIMARY};
    color: #ffffff;

    &:hover {
        cursor: pointer;
        filter: brightness(.9);
    }
`;

const MetroButton = styled.button`
    height: 30px;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 15px;
    padding-right: 15px;
    background-color: #eeeeee;
    border: 1px solid #aaaaaa;

    &:hover {
        cursor: pointer;
        filter: brightness(.9);
    }
`;

const SimpleButton = styled.button`
    border: none;
    height: 30px;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;

    &:hover {
        cursor: pointer;
    }

    .icon {
        font-size: 32px;
        color: #444444;
    }
`;

const ButtonText = styled.p`
    font-size: 14px;
`;

const ErrorText = styled.p`
    font-size: 12px;
    color: ${EnumAppColors.ERROR};
`;

const View = styled.div<ViewProps>`
    background-color: #ffffff;
    box-shadow: 0 1px 15px rgba(0,0,0,.04),0 1px 6px rgba(0,0,0,.04);
    transition: box-shadow 1s;
    border-radius: 0px;
    height: auto;
    padding: ${props => props.padding ? props.padding : 0}px;
`;

const Button = styled.button`
    width: auto;
    min-width: 150px;
    border: none;
    background-color: ${EnumAppColors.PRIMARY};
    color: #ffffff;
    font-weight: normal;
    text-transform: uppercase;
    text-align: center;
    height: 40px;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 0px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.23);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    margin-right: .5rem;

    &:hover {
        filter: brightness(.9);
        cursor: pointer;
    }
`;

export {
    Form, 
    InputGroup, 
    InputLabel, 
    PrimaryButton, 
    ButtonText,
    ErrorText,
    MetroButton,
    SimpleButton,
    Button,
    View,
};