import styled from "styled-components";

const DrawerView = styled.div`
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    z-index: 700;
    padding: 10px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 15;
    height: auto;
`;

const Content = styled.div``;

const HeaderItem = styled.div``;

const Title = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: #444444;
    @media screen and (max-width: 1200px) {
        font-size: 14px;
    }
`;

const Subtitle = styled.p`
    font-size: 16px;
    font-weight: normal;
    color: #666666;
    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
`;

const CloseButton = styled.button`
    border: none;
    height: 35px;
    padding-right: 15px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #444444;
    background-color: #eeeeee;
    border: 1px solid #aaaaaa;

    &:hover {
        cursor: pointer;
        filter: brightness(.9);
    }

    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
`;

export {
    DrawerView,
    Header,
    Content,
    Title,
    Subtitle,
    HeaderItem,
    CloseButton,
};