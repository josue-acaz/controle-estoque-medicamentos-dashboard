import React, {useState, useEffect} from "react";

// types
import {DrawerProps} from "./types";

// styles
import {
    DrawerView,
    Header,
    Content,
    HeaderItem,
    Title,
    Subtitle,
    CloseButton,
} from "./styles";

const Drawer: React.FC<DrawerProps> = (props) => {
    const {children, open, title, subtitle, onClose} = props;
    const [isFirist, setIsFirist] = useState(true);

    useEffect(() => {
        if(isFirist && open) {
            setIsFirist(false);
        }
    }, [open]);
 
    return(
        <DrawerView 
            className={open ? "scale-in-ver-bottom" : isFirist ? "" : "scale-out-ver-bottom"} 
            style={{display: isFirist ? "none" : "block"}}
        >
            <Header>
                <HeaderItem>
                    <Title>{title}</Title>
                    <Subtitle>{subtitle}</Subtitle>
                </HeaderItem>
                <HeaderItem>
                    <CloseButton onClick={onClose}>Fechar</CloseButton>
                </HeaderItem>
            </Header>
            <Content>{children}</Content>
        </DrawerView>
    );
};

export default Drawer;