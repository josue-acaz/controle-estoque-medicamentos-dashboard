import styled from "styled-components";

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

export {
    ListProductInputsView,
    ListProductInputsContent,
};