import React, {useState} from "react";
import {isMobile} from "react-device-detect";

// types
import {LayoutProps} from "./types";

// components
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";

// styles
import {LayoutView} from "./styles";

const Layout: React.FC<LayoutProps> = ({children, sidebarOptions}) => {
    const [minimized, setMinimized] = useState(isMobile);

    function toggleMinimized() {
        setMinimized(!minimized);
    }

    return(
        <LayoutView minimized={minimized}>
            <Navbar onCollapse={toggleMinimized} />
                <Content>
                    {children}
                </Content>
            <Sidebar 
                minimized={minimized} 
                options={sidebarOptions} 
                onOptionClicked={() => {
                    if(isMobile) {
                        toggleMinimized();
                    }
                }} 
            />
        </LayoutView>
    );
};

export default Layout;