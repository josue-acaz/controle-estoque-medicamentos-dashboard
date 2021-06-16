import React, {useState, useEffect, useRef} from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Skeleton from '@material-ui/lab/Skeleton';
import Spinner from "../Spinner";

import './styles.css';

function useOutsideAutocomplete(ref: any, onClickOutside = (clickedOutside: boolean) => clickedOutside) {
    useEffect(() => {
        /**
         * If clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside(true);
            } else { onClickOutside(false); }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onClickOutside]);
}

interface CoreProps {
    value: string;
    onChange(e: any): void;
    Icon?: React.ReactNode | JSX.Element | any;
    visible: boolean;
    loading: boolean;
    toggleVisible(): void;
    error: boolean;
    options: Array<any>;
    initializing: boolean;
    fieldName: string;
    renderOption(option: any): any;
    placeholder?: string;
    handleClickInput(): void;
    iconPosition?: "start" | "end";
    onOptionSelected(option: any): void;
}

interface OptionProps {
    index: number; 
    cursor: number;
    option: any;
    optionsLength: number; 
    fieldName: string;
    handleClickOption(option: any): void;
    renderOption(option: any): any;
};

function Option({index, cursor, option, optionsLength, fieldName, handleClickOption, renderOption}: OptionProps) {
    const ref = useRef<any>(null);

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
        <li 
            ref={ref}
            style={index === optionsLength-1 ? {borderBottom: "none"} : {}}
            className={`core-option ${cursor === index ? 'core-option-active' : ''}`} 
            onClick={() => handleClickOption(option)}
        >
            {renderOption ? renderOption(option) : (
                <div className="render-option">
                    <p>{option[fieldName]}</p>
                </div>
            )}
        </li>
    );
}

export default function Core({ 
    value, 
    onChange, 
    Icon,
    visible,
    loading,
    toggleVisible,
    error,
    options=[],
    initializing,
    renderOption,
    placeholder="Pesquisar por...", 
    handleClickInput,
    iconPosition="start",
    onOptionSelected,
    fieldName, }: CoreProps) {
    const [cursor, setCursor] = useState<number>(0);
    const wrapperRef = useRef(null);

    function handleClickOption(option: any) {
        onOptionSelected(option);
        toggleVisible();
    }

    function handleKeyUp(e: any) {
        // arrow up/down button should select next/previous list element
        if (e.keyCode === 38 && cursor > 0) {
          setCursor(cursor - 1);
        } else if (e.keyCode === 40 && cursor < options.length - 1) {
          setCursor(cursor + 1);
        }

        if(e.key === "Enter") {
            handleClickOption(options[cursor]);
        }
    }

    // Hide on click outside
    useOutsideAutocomplete(wrapperRef, (clickedOutside: boolean) => {
        if(clickedOutside) {
            if(visible) {
                toggleVisible();
            }
        }

        return clickedOutside;
    });

    return(
        <div ref={wrapperRef} className="autocomplete-core">
            <div className="autocomplete-input">
                {initializing ? <Skeleton variant="rect" animation="wave" className="input-skeleton" /> : (
                    <input 
                        type="text" 
                        value={value} 
                        onChange={onChange} 
                        onClick={handleClickInput}
                        placeholder={placeholder}
                        className={visible ? 'no-border-bottom auto-visible' : ''}
                        onKeyUp={handleKeyUp}
                    />
                )}
                {error && <span className="error">Este campo é obrigatório.</span>}
                {Icon && (
                    <span className={`icon-${iconPosition}`}>
                        <Icon className="icon" />
                    </span>
                )}
                <span className="arrow">
                    {loading ? <Spinner /> : <ArrowDropDownIcon className="icon" />}
                </span>
            </div>
            {visible && (
                <span className={`autocomplete-core-options ${visible ? 'autocomplete-core-options-visible' : ''}`}>
                    <ul className="autocomplete-options">
                        {options.length > 0 ? (
                            options.map((option, index) => (
                                <Option 
                                    key={index} 
                                    cursor={cursor}
                                    index={index} 
                                    option={option} 
                                    optionsLength={options.length} 
                                    fieldName={fieldName} 
                                    renderOption={renderOption}
                                    handleClickOption={handleClickOption}
                                />
                            ))
                        ) : <p className="no-results">{`Nenhum resultado encontrado para "${value.trim()}"`}</p>}
                    </ul>
                </span>
            )}
        </div>
    );
}
