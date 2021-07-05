import React from "react";

// types
import {InputProps} from "./types";

// styles
import {
    InputView, 
    InputElement,
    Adorment,
    ErrorText,
} from "./styles";

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement> & InputProps) {
    const {adorment, adormentPosition = "end", error} = props;

    return(
        <InputView>
            {adorment && (
                <Adorment className="adorment" position={adormentPosition}>
                    {adorment}
                </Adorment>
            )}
            <InputElement className="input" {...props} />
            {error && <ErrorText>Este campo é obrigatório.</ErrorText>}
        </InputView>
    );
}
