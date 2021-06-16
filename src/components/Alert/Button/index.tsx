import React from 'react';

import './styles.css';

interface ButtonProps {
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick(): void;
    decoration: "normal" | "slim";
    color?: string;
    theme?: "primary" | "danger" | "secondary" | "info" | "success" | "error";
    style?: React.CSSProperties;
};

const Button: React.FC<ButtonProps> = ({
    className, 
    type, 
    children, 
    decoration, 
    style,
    theme = 'primary',
    onClick}) => (
    <button style={style} className={`slim-button ${className} btn-${decoration}-${theme}`} type={type} onClick={onClick}>
        {children}
    </button>
);

export default Button;
