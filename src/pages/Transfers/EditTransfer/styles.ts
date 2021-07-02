import styled from "styled-components";

const TransferForm = styled.form``;

const LotOptionView = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LotOptionData = styled.div``;

const LotTransferredView = styled.div``;

const LotTransferredProductText = styled.p`
    font-size: 16px;
    color: #000000;
`;

const LotTransferredSerialNumber = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: #444444;
`;

const LotTransferredData = styled.div`
    display: flex;
    align-items: center;
`;

const LotBaseData = styled.div`
    display: flex;
    align-items: center;
`;

const LotBaseText = styled.div`
    font-size: 14px;
`;

const LotSerialNumber = styled.p`
    font-size: 16px;
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
    TransferForm,
    LotOptionView,
    LotSerialNumber,
    LotProductName,
    SelectedLot,
    LotOptionData,
    LotBaseData,
    LotBaseText,
    LotTransferredView,
    LotTransferredSerialNumber,
    LotTransferredData,
    LotTransferredProductText,
};