import styled from "styled-components";
import {LayoutViewProps} from "./types";

const LayoutView = styled.div<LayoutViewProps>`
    display: grid;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    grid-template-columns: 1fr 5fr;
    transition: 2s;
    grid-template-rows: 50px auto;
    grid-template-areas: "header header"
                         "${props => props.minimized ? "main" : "aside"} main";

    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr;
        grid-template-areas: "header header"
                             "main main";
    }
`;

export {LayoutView};