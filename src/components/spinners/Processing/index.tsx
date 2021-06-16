import React from "react";

// types
import {ProcessingProps} from "./types";

// styles
import {
    ProcessingView, 
    ProcessingContent, 
    ProcessingSpinner,
    Feedback, 
    Title, 
    Message,
} from "./styles";

const Processing = (props: ProcessingProps) => (
    <ProcessingView>
        <ProcessingContent>
            <ProcessingSpinner>
                <div className="half-circle-spinner">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                </div>
            </ProcessingSpinner>
            <Feedback>
                <Title>{props.title}</Title>
                <Message>{props.msg}</Message>
            </Feedback>
        </ProcessingContent>
    </ProcessingView>
);

export default Processing;