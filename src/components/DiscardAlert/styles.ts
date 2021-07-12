import styled from "styled-components";
import { EnumAppColors } from "../../constants";

const DiscardAlertView = styled.div``;

const DiscardForm = styled.div`
    margin-top: 10px;
`;

const Observation = styled.div`
    display: flex;
    align-items: center;
`;

const ObservationIcon = styled.div`
    .icon {
        font-size: 22px;
        color: ${EnumAppColors.ORANGE};
    }
`;

const ObservationText = styled.p`
    font-size: 14px;
    color: #666666;
    margin-left: 5px;
`;

export {
    DiscardAlertView, 
    DiscardForm, 
    ObservationText,
    Observation,
    ObservationIcon,
};