import styled from "styled-components";
import {RecGraphElementProps} from "./types";

const RecGraphView = styled.div`
    min-height: 500px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const RecGraphItem = styled.div``;

const RecGraphLabel = styled.p`
    font-size: 26px;
    font-weight: bold;
    color: #ffffff;
`;

const RecGraphTitle = styled.p`
    font-size: 16px;
    color: #666666;
    font-weight: bold;
`;

const RecGraphElement = styled.div<RecGraphElementProps>`
    height: 100px;
    width: 100%;
    background-color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #eeeeee;
`;

export {
    RecGraphView,
    RecGraphItem,
    RecGraphLabel,
    RecGraphTitle,
    RecGraphElement,
}