import styled from "styled-components";
import {EnumAppColors} from "../../../../constants";

const ListProductInputsView = styled.div`
`;

const ListProductInputsContent = styled.div`
    border-left: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;

    @media screen and (max-width: 1200px) {
        border-left: none;
        border-top: none;
    }
`;

const OutputQuantityCellView = styled.div``;

const OutputNumber = styled.p`
    font-size: 14px;
    color: ${EnumAppColors.ERROR};
    font-weight: bold;
`;

const OutputQuantity = styled.p`
    font-size: 12px;
    color: #999999;
`;

export {
    ListProductInputsView,
    ListProductInputsContent,
    OutputQuantityCellView,
    OutputNumber,
    OutputQuantity,
};