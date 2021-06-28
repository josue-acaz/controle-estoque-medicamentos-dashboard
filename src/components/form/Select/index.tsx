import React, {useState, useEffect} from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Option from "./Option";

// types
import {SelectProps, OptionProps} from "./types";

// icons
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

// styles
import {
    SelectView,
    SelectInput,
    Span,
    CollapseView,
    CollapseOptions,
    InputElement,
    SkeletonLoader,
} from "./styles";

export default function Select(props: SelectProps) {
    const {options, initializing=false, style} = props;
    const [cursor, setCursor] = useState(0);
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<OptionProps>(options.length > 0 ? options[0] : {label: "Selecione...", value: ""});

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

    useEffect(() => {
        setSelectedOption(options[0]);
    }, [options.length]);

    return(
        <OutsideClickHandler onOutsideClick={() => {
            if(open) {
                setOpen(false);
            }
        }}>
            <SelectView style={style}>
                <SelectInput>
                    {initializing ? <SkeletonLoader variant="rect" animation="wave" /> : (
                        <InputElement 
                            name={props.name} 
                            value={selectedOption.label} 
                            onClick={toggleOpen} 
                            onKeyUp={handleKeyUp} 
                            placeholder="Selecione..."
                        />
                    )}
                </SelectInput>
                <Span onClick={() => {
                    if(!initializing) {
                        toggleOpen();
                    }
                }}>
                    <ArrowDropDownIcon className="icon" />
                </Span>
                {open && options.length > 0 && (
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
        </OutsideClickHandler>
    );
}
