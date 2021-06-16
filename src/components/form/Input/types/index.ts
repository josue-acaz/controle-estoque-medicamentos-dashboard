import React from "react";

interface InputProps {
    error?: boolean;
    adorment?: React.ReactNode;
    adormentPosition?: "start" | "end";
};

interface AdormentProps {
    position?: "start" | "end";
};

export type {InputProps, AdormentProps};