import React from "react";
import Core from "./Core";
import Button from "./Button";

import "./styles.css";

interface AlertProps {
    open: boolean;
    title?: string;
    msg?: string;
    theme?: "primary" | "danger" | "secondary" | "info" | "success" | "error";
    handleConfirm(): void;
    handleCancel(): void;
    handleClose(): void;
};

const Alert = (props: AlertProps) => {
    const {open, handleClose, title, msg, theme = "primary", handleCancel, handleConfirm} = props;

    return(
        <Core className="lay-alert" show={open} handleClose={handleClose}>
            <div className="alert-container">
                <p className="title">{title}</p>
                <p className="msg">{msg}</p>
                <div className="alert-actions">
                    <Button theme={theme} style={{width: '100%'}} onClick={handleConfirm} decoration="normal">
                        SIM
                    </Button>
                    <Button theme={theme} style={{width: '100%'}} onClick={handleCancel} decoration="slim">
                        NÃO
                    </Button>
                </div>
            </div>
        </Core>
    );
};

export default Alert;
