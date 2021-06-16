import React, {useRef, useEffect} from "react";

// types
import {OptionProps} from "./types";

// styles
import {OptionView, OptionText} from "./styles";

export default function Option(props: OptionProps) {
    const ref = useRef<any>(null);
    const {onSelected, label, value, cursor, index} = props;

    useEffect(() => {
        if(ref.current) {
            if(cursor === index) {
                ref.current.focus();
                ref.current.scrollIntoView({
                    behavior: "smooth", 
                    block: "nearest", 
                    inline: "start",
                });
            } else {
                ref.current.blur();
            }
        }
    }, [cursor]);

    return(
        <OptionView active={cursor === index} ref={ref} onClick={() => onSelected({label, value})}>
            <OptionText>{label}</OptionText>
        </OptionView>
    );
}
