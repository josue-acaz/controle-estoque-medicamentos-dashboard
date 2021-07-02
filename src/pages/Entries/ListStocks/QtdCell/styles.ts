import styled from "styled-components";

const QtdCellView = styled.div`
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
    background-color: transparent;
    padding-left: 5px;
    padding-right: 5px;
`;

const QtdCellContent = styled.div`
    text-align: center;
`;

const QtdText = styled.p`
    font-size: 14px;
    color: #666666;
    font-weight: bold;
`;

const MinimumQtd = styled.div`
    display: flex;
    align-items: center;
`;

const MinimumQtdText = styled.p`
    font-size: 12px;
    color: red;
`;

export {
    QtdText,
    QtdCellView,
    MinimumQtd,
    MinimumQtdText,
    QtdCellContent,
};