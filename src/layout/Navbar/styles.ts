import styled from "styled-components";

const NavbarView = styled.header`
    background: #ffffff;
    grid-area: header;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.23);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
`;

const CollapseButton = styled.button`
    border: none;
    height: 30px;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;

    &:hover {
        cursor: pointer;
    }

    .icon {
        font-size: 32px;
        color: #444444;
    }
`;

const NavItem = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled.img`
    height: 40px;
    width: 100px;
    object-fit: contain;
`;

export {
    NavbarView, 
    NavItem,
    CollapseButton,
    Logo,
};
