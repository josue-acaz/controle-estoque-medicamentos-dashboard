import React from "react";

// types
import {TabItemProps} from "./types";

// styles
import {
    TabItemView, 
    TabItemContent,
    Title, 
    Subtitle,
    ActiveBar,
    Header,
    Icon,
} from "./styles";

export default function TabItem(props: TabItemProps) {
    const {index, name, title, subtitle, icon, active, activeColor, onClick} = props;

    return(
        <TabItemView onClick={() => onClick({name, index})}>
            <TabItemContent>
                <Header>
                    {icon && <Icon>{icon}</Icon>}
                    <Title>{title}</Title>
                </Header>
                <Subtitle>{subtitle}</Subtitle>
            </TabItemContent>
            <ActiveBar active={active} activeColor={activeColor} />
        </TabItemView>
    );
}
