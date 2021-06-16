interface SnackbarFeedbackProps {
    severity: "success" | "info" | "warning" | "error";
    msg?: string;
    open: boolean;
    handleClose(): void;
    autoHideDuration?: number;
}

interface setPreferencesProps {
    [key: string]: any;
    msg?: string;
    severity: "success" | "info" | "warning" | "error";
    autoHideDuration?: number;
};

interface FeedbackContextProps {
    open(preferences: setPreferencesProps): void;
}

export type {
    SnackbarFeedbackProps,
    setPreferencesProps,
    FeedbackContextProps,
};