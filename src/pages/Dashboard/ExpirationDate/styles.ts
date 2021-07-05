import styled from "styled-components";
import Input from "../../../components/form/Input";

const ExpirationDateView = styled.div`
    .recharts-wrapper {
        width: 100%;
        height: 600px;
        background-color: red;
    }
`;

const Title = styled.p`
    font-size: 18px;
    color: #444444;
    font-weight: bold;
`;

const Subtitle = styled.p`
    font-size: 16px;
    color: #999999;
`;

const SearchInput = styled(Input)`
    border: none;
    background-color: #fafafa;
`;

const ProductOption = styled.div`
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    padding-left: 10px;
    padding-right: 10px;

    &:hover {
        cursor: pointer;
        filter: brightness(.9);
        background-color: #f2f2f2;
    }
`;

const ProductText = styled.p`
    font-size: 16px;
    color: #444444;
`;

export {
    Title,
    Subtitle,
    ProductText,
    ProductOption,
    ExpirationDateView,
    SearchInput,
};