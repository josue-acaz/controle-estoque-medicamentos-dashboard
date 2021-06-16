import React, {useEffect, useState} from 'react';
import api from "../../../api";
import Core from "./core";

// Icons
import SearchIcon from '@material-ui/icons/Search';

type OptionSelectedProps = {
    name: string;
    value: any;
};

type OptionSelected = {
    target: OptionSelectedProps
};

interface AutocompleteProps {
    name: string,
    inputText?: string,
    params?: any, 
    endpoint: string, 
    renderOption(option: any): any, 
    fieldName: string,
    error: boolean,
    onOptionSelected(option: OptionSelected): void, 
    placeholder?: string,
    Icon?: React.ReactNode | JSX.Element | any;
    iconPosition?: "start" | "end";
}

export default function Autocomplete({
    name,
    inputText="",
    params={}, 
    endpoint, 
    renderOption, 
    fieldName="name",
    error,
    onOptionSelected, 
    placeholder,
    iconPosition,
    Icon}: AutocompleteProps) {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState([]);
    const [initializing, setInitializing] = useState(true);

    async function getOptions(value: string) {
        setLoading(true);
        try {
            const response = await api.get(endpoint, {
                params: {
                    ...params,
                    limit: 10,
                    offset: 0,
                    text: value.trim(),
                }
            });
            setOptions(response.data);
            setLoading(false);
            setVisible(true);
        } catch (error) {
            setLoading(false);
            setVisible(true);
            console.error(error);
        }
    }

    // Faz uma busca vazia para inicializar o componente
    useEffect(() => {
        async function initialize() {
            try {
                await api.get(endpoint, {
                    params: {
                        text: "",
                    },
                });

                setInitializing(false);
            } catch (error) {
                setInitializing(false);
                console.error(error);
            }
        }

        initialize();
    }, [endpoint]);

    async function handleChange(e: any) {
        setValue(e.target.value);
        await getOptions(e.target.value);
    }

    function toggleVisible() {
        setVisible(!visible);
    }

    async function handleClickInput() {
        if(value) { // limpar input toda vez que o usuario clicar
            setValue("");
            onOptionSelected({
                target: {
                    name,
                    value: "",
                }
            })
        }
        setVisible(true);
        await getOptions("");
    }

    function handleOptionSelected(option: any) {
        setValue(option[fieldName]);
        onOptionSelected({
            target: {
                name: name,
                value: option,
            }
        });
        setVisible(false);
    }

    useEffect(() => {
        setValue(inputText);
    }, [inputText]);

    return(
        <Core 
            value={value} 
            visible={visible}
            error={error}
            options={options}
            loading={loading}
            initializing={initializing}
            onChange={handleChange} 
            Icon={Icon} 
            fieldName={fieldName}
            placeholder={placeholder}
            toggleVisible={toggleVisible}
            handleClickInput={handleClickInput}
            renderOption={renderOption}
            onOptionSelected={handleOptionSelected}
            iconPosition={iconPosition}
        />
    );
}