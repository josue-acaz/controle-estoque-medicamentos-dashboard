interface SnackbarFeedbackProps {
    severity: 'success' | 'info' | 'warning' | 'error';
    msg?: string;
    open: boolean;
    handleClose(): void;
    autoHideDuration?: number;
}

export type {SnackbarFeedbackProps};