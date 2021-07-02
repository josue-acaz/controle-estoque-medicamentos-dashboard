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

const LotOptionView = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LotSerialNumber = styled.p`
    font-size: 16px;
    color: #444444;
`;
const LotBaseData = styled.div`
    display: flex;
    align-items: center;
`;
const LotProductName = styled.p`
    font-size: 14px;
    color: #666666;
`;

const SelectedLot = styled.p`
    font-size: 16px;
    color: #333333;
`;

const LotOptionData = styled.div``;

const LotBaseText = styled.div`
    font-size: 14px;
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
    LotOptionData,
    LotBaseData,
    LotBaseText,
};