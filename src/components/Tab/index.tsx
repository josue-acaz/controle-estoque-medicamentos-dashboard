import React from "react";
import TabItem from "./TabItem";

// types
import {TabProps} from "./types";

// styles
import {TabView} from "./styles";

export default function Tab(props: TabProps) {
    const {tabs, selected, onChange} = props;

    return(
        <TabView>
            {tabs.map((tab, index) => (
                <TabItem 
                    key={index} 
                    index={index} 
                    name={tab.name}
                    title={tab.title} 
                    subtitle={tab.subtitle} 
                    onClick={onChange}
                    icon={tab.icon}
                    active={index === selected}
                    activeColor={tab.activeColor}
                />
            ))}
        </TabView>
    );
}
