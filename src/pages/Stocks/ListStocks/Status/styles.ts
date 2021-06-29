import styled from "styled-components";
import {StatusViewProps} from "./types";

function getStatusColor(status: string) {
    let color = "";

    if(status === "max") {
        color = "#4CAF50";
    }
    else if(status === "med") {
        color = "#efeeb4";
    }
    else if(status === "low") {
        color = "#ffa500";
    }
    else if(status === "min") {
        color = "#f74d4d";
    }

    return color;
}

const StatusView = styled.div<StatusViewProps>`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => getStatusColor(props.status)};
    color: #ffffff;
    padding-left: 5px;
    padding-right: 5px;
`;

const StatusText = styled.p`
    font-size: 14px;
    color: #ffffff;
`;

export {StatusView, StatusText};