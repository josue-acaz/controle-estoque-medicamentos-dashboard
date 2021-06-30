import styled from "styled-components";

const SearchView = styled.div`
    display: flex;
    align-items: center;
    margin-left: 5px;
    position: relative;
`;

const SearchButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    padding: 0;
    height: 100%;

    &:hover {
        cursor: pointer;
        filter: brightness(.9);
    }
    
    .icon {
        font-size: 24px;
        color: #444444;
    }
`;

const SearchCollapse = styled.div`
    position: absolute;
    top: 57px;
    left: 1px;
    width: 430px;
    height: auto;
    z-index: 99;
    background-color: #ffffffff;
    padding: 15px;
    box-shadow: 0 1px 15px rgba(0,0,0,.04),0 1px 6px rgba(0,0,0,.04);

    @media screen and (max-width: 1200px) {
        width: 100%;
    }
`;

const SearchContent = styled.div``;

const CloseView = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const CloseLink = styled.a`
    text-decoration: underline;
    color: blue;
    font-size: 14px;
    cursor: pointer;

    @media screen and (max-width: 1200px) {
        font-size: 12px;
    }
`;

export {
    SearchView,
    SearchButton,
    SearchCollapse,
    SearchContent,
    CloseView,
    CloseLink,
};