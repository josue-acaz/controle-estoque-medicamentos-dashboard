import React from "react";
import Core from "./Core";
import Button from "./Button";

import "./styles.css";

interface AlertProps {
    open: boolean;
    title?: string;
    msg?: string;
    theme?: "primary" | "danger" | "secondary" | "info" | "success" | "error";
    onConfirm(): void;
    onCancel(): void;
    onClose(): void;
};

const Alert = (props: AlertProps) => {
    const {open, title, msg, theme = "primary", onCancel, onConfirm, onClose} = props;

    return(
        <Core className="lay-alert" show={open} handleClose={onClose}>
            <div className="alert-container">
                <p className="title">{title}</p>
                <p className="msg">{msg}</p>
                <div className="alert-actions">
                    <Button theme={theme} style={{width: '100%'}} onClick={onConfirm} decoration="normal">
                        SIM
                    </Button>
                    <Button theme={theme} style={{width: '100%'}} onClick={onCancel} decoration="slim">
                        NÃO
                    </Button>
                </div>
            </div>
        </Core>
    );
};

export default Alert;
