import React, {createContext, useState, useContext} from "react";
import SnackbarFeedback from "../../components/SnackbarFeedback";

// types
import {SnackbarFeedbackProps, FeedbackContextProps, setPreferencesProps} from "./types";

const FeedbackContext = createContext<FeedbackContextProps>({} as FeedbackContextProps);

export const FeedbackProvider: React.FC = ({children}) => {
    const [feedback, setFeedback] = useState({} as SnackbarFeedbackProps);
    const handleFeedback = (name: string, value: any) => {
        setFeedback(feedback => ({ ...feedback, [name]: value }));
    };

    const close = () => handleFeedback("open", false);

    function open(preferences: setPreferencesProps) {
        handleFeedback("open", true);
        setPreferences(preferences);
    }

    function setPreferences(preferences: setPreferencesProps) {
        Object.keys(preferences).forEach(key => {
            handleFeedback(key, preferences[key]);
        });
    }

    return(
        <FeedbackContext.Provider value={{open}}>
            {children}
            <SnackbarFeedback 
                open={feedback.open} 
                severity={feedback.severity} 
                msg={feedback.msg}
                handleClose={close} 
            />
        </FeedbackContext.Provider>
    );
}

export function useFeedback() {
    const context = useContext(FeedbackContext);
    return context;
}