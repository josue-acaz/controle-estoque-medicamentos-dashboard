import React, {useState, useEffect} from "react";
import Option from "./Option";

// types
import {SelectProps, OptionProps} from "./types";

// icons
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

// styles
import {
    SelectView,
    SelectInput,
    SelectMask,
    Span,
    CollapseView,
    CollapseOptions,
    SelectedOption,
    SelectedOptionText,
    InputElement,
} from "./styles";

export default function Select(props: SelectProps) {
    const {options} = props;
    const [cursor, setCursor] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<OptionProps>(options[0]);

    function toggleOpen() {
        setOpen(!open);
    }

    function handleSelectedOption(option: OptionProps) {
        toggleOpen();
        props.onChange(option);
        setSelectedOption(option);
    }

    function handleKeyUp(e: any) {
        const current_option = options[cursor];

        if(!open) {
            props.onChange(current_option);
            setSelectedOption(current_option);
        }

        // arrow up/down button should select next/previous list element
        if (e.keyCode === 38 && cursor > 0) {
            setCursor(cursor - 1);
        } else if (e.keyCode === 40 && cursor < options.length - 1) {
            setCursor(cursor + 1);
        }

        if(e.key === "Enter") {
            handleSelectedOption(current_option);
        }
    }

    return(
        <SelectView>
            <SelectInput>
                <InputElement 
                    name={props.name} 
                    value={selectedOption.label} 
                    onClick={toggleOpen} 
                    onKeyUp={handleKeyUp} 
                    placeholder="Selecione..."
                />
            </SelectInput>
            <Span onClick={toggleOpen}>
                <ArrowDropDownIcon className="icon" />
            </Span>
            {open && (
                <CollapseView>
                    <CollapseOptions>
                        {options.map((option, index) => (
                            <Option 
                                key={index} 
                                index={index}
                                cursor={cursor}
                                {...option} 
                                onSelected={handleSelectedOption}
                            />
                        ))}
                    </CollapseOptions>
                </CollapseView>
            )}
        </SelectView>
    );
}
