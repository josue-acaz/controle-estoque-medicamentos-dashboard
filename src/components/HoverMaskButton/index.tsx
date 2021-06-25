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
    const {title="", icon, styleType="hover"} = props;

    return(
        <HoverMaskButtonView {...props}>
            <HoverMaskButtonContent styleType={styleType}>
                <Feedback>
                    <Title>{title}</Title>
                    {icon && <Icon>{icon}</Icon>}
                </Feedback>
            </HoverMaskButtonContent>
        </HoverMaskButtonView>
    );
}