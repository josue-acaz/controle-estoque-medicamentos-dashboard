import React, {useState} from "react";

// types
import {LayoutProps} from "./types";

// components
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";

// styles
import {LayoutView} from "./styles";

const Layout: React.FC<LayoutProps> = ({children, sidebarOptions}) => {
    const [minimized, setMinimized] = useState(false);

    function toggleMinimized() {
        setMinimized(!minimized);
    }

    return(
        <LayoutView minimized={minimized}>
            <Navbar onCollapse={toggleMinimized} />
                <Content>
                    {children}
                </Content>
            <Sidebar minimized={minimized} options={sidebarOptions} />
        </LayoutView>
    );
};

export default Layout;