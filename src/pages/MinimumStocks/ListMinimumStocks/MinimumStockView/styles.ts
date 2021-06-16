import styled from "styled-components";

const ToolbarView = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ToolbarItem = styled.div`
    padding-left: 10px;
    padding-right: 10px;
`;

const ToolbarText = styled.p`
    font-size: 18px;
    color: #444444;
    font-weight: 600;
`;

export {ToolbarView, ToolbarItem, ToolbarText};