import styled from "styled-components";

const ToolbarView = styled.div`
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Header = styled.div``;

const Title = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: #444444;

    @media screen and (max-width: 1200px) {
        font-size: 14px;
    }
`;

const Subtitle = styled.p`
    font-size: 14px;
    color: #999999;

    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
`;

const ToolbarCol = styled.div`
    display: flex;
    align-items: center;
`;

export {
    ToolbarView,
    ToolbarCol,
    Header,
    Title,
    Subtitle,
};