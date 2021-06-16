import React from "react";

// styles
import {ContentView} from "./styles";

const Content: React.FC = ({children}) => {

    return(
        <ContentView>
            {children}
        </ContentView>
    );
};

export default Content;