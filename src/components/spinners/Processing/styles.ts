import styled from "styled-components";

const ProcessingView = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProcessingContent = styled.div`
    text-align: center;
    width: auto;
    position: relative;
    background-color: #ffffff;
    padding: 1rem;
    border-radius: 1rem;
`;

const ProcessingSpinner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    .half-circle-spinner, .half-circle-spinner * {
        box-sizing: border-box;
    }

    .half-circle-spinner {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        position: relative;
    }

    .half-circle-spinner .circle {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        border: calc(60px / 10) solid transparent;
    }

    .half-circle-spinner .circle.circle-1 {
        border-top-color: #00B2A9;
        animation: half-circle-spinner-animation 1s infinite;
    }

    .half-circle-spinner .circle.circle-2 {
        border-bottom-color: #00B2A9;
        animation: half-circle-spinner-animation 1s infinite alternate;
    }

    @keyframes half-circle-spinner-animation {
        0% {
        transform: rotate(0deg);

        }
        100%{
        transform: rotate(360deg);
        }
    }
`;

const Feedback = styled.div`
    margin-top: 15px;
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: #444444;
`;

const Message = styled.p`
    font-size: 14px;
    color: #666666;
`;

export {
    ProcessingView, 
    ProcessingContent,
    ProcessingSpinner,
    Feedback,
    Title,
    Message,
};