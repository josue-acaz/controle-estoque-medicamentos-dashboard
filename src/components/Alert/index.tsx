import React from "react";
import Core from "./Core";
import Button from "./Button";

import "./styles.css";

interface AlertProps {
    open: boolean;
    title?: string;
    msg?: string;
    theme?: "primary" | "danger" | "secondary" | "info" | "success" | "error";
    labelConfirm?: string;
    labelCancel?: string;
    onConfirm(): void;
    onCancel(): void;
    onClose(): void;
};

const Alert: React.FC<AlertProps> = (props) => {
    const {open, title, msg, theme="primary", labelCancel="NÃO", labelConfirm="SIM", children, onCancel, onConfirm, onClose} = props;

    return(
        <Core className="lay-alert" show={open} handleClose={onClose}>
            <div className="alert-container">
                <div className="alert-header">
                    <p className="title">{title}</p>
                    <p className="msg">{msg}</p>
                </div>
                <div className="alert-content">
                    {children}
                </div>
                <div className="alert-actions">
                    <Button theme={theme} style={{width: '100%'}} onClick={onConfirm} decoration="normal">
                        {labelConfirm}
                    </Button>
                    <Button theme={theme} style={{width: '100%'}} onClick={onCancel} decoration="slim">
                        {labelCancel}
                    </Button>
                </div>
            </div>
        </Core>
    );
};

export default Alert;
