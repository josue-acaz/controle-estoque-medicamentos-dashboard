import styled from "styled-components";

const HoverMaskButtonContent = styled.div`
    display: none;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(76, 175, 80, .5);
`;

const HoverMaskButtonView = styled.button`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        ${HoverMaskButtonContent} {
            cursor: pointer;
            display: flex;
        }
    }
`;

const Feedback = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.p`
    margin: 0;
    font-size: 16px;
    color: #ffffffff;
`;

const Icon = styled.div`
    .icon {
        font-size: 22px;
        color: #ffffffff;
    }
    display: flex;
    align-items: center;
    justify-content: center;
`;

export {
    HoverMaskButtonView,
    HoverMaskButtonContent,
    Feedback,
    Title,
    Icon,
};