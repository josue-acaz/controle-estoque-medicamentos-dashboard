import styled from "styled-components";
import {StatusProps, StockProps} from "./types";

function getStatusColor(days: number) {
    let color = "#FFFFFF";
    if (days > 30) {
        color = "#4CAF50";
    }
    else if(days <= 30 && days > 10) {
        color = "#efeeb4";
    }
    else if(days <= 10) {
        color = "#f74d4d";
    }

    return color;
}

function getStockColor(quantity: number) {
    let color = "#4CAF50";
    if(quantity > 100) {
        color = "#4CAF50";
    }
    else if(quantity <= 100 && quantity > 50) {
        color = "#efeeb4";
    }
    else if(quantity <= 50) {
        color = "#f74d4d";
    }

    return color;
}

const Name = styled.div`
`;

const NameTitle = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #444444;
`;

const NameSubtitle = styled.p`
    font-size: 14px;
    color: #999999;
`;

const BaseStockView = styled.div`
    
`;

const Status = styled.div<StatusProps>`
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
    background-color: ${props => getStatusColor(props.days)};
    color: #ffffff;
    padding-left: 5px;
    padding-right: 5px;
`;

export {
    Status,
    BaseStockView,
    Name,
    NameTitle,
    NameSubtitle,
};