import React from "react";

// types
import {HoverMaskButtonProps} from "./types";

// styles
import {
    HoverMaskButtonView,
    HoverMaskButtonContent,
    Icon,
    Title,
    Feedback,
} from "./styles";

export default function HoverMaskButton(props: React.ButtonHTMLAttributes<HTMLButtonElement> & HoverMaskButtonProps) {
    const {title, icon} = props;

    return(
        <HoverMaskButtonView {...props}>
            <HoverMaskButtonContent>
                <Feedback>
                    <Title>{title}</Title>
                    <Icon>{icon}</Icon>
                </Feedback>
            </HoverMaskButtonContent>
        </HoverMaskButtonView>
    );
}