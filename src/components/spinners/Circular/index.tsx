import React from "react";

// types
import {CircularProps} from "./types";

// styles
import {CircularView, CircleOne, CircleTwo} from "./styles";

const Circular = (props: CircularProps) => {
    const {size = 50, color = "#ffffff"} = props;

    return(
        <CircularView size={size}>
            <CircleOne color={color} />
            <CircleTwo color={color} />
        </CircularView>
    );
};

export default Circular;