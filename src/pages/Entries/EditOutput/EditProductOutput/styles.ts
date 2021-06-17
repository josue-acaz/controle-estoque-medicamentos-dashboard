import styled from "styled-components";

const EditProductOutputView = styled.div`
    margin-top: 15px;
`;

const Title = styled.p`
    font-size: 18px;
    color: #444444;
    font-weight: bold;
`;

const Form = styled.div``;

const FormActions = styled.div`
    display: flex;
    align-items: center;
`;

const LotOptionView = styled.div``;

const LotSerialNumber = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: #444444;
`;

const LotProductName = styled.p`
    font-size: 14px;
    color: #666666;
`;

const SelectedLot = styled.p`
    font-size: 16px;
    color: #333333;
`;

export {
    EditProductOutputView,
    Title,
    Form,
    FormActions,
    SelectedLot,
    LotOptionView,
    LotSerialNumber,
    LotProductName,
};