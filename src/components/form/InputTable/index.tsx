import React from "react";

// styles
import "./styles.css";
import {InputTableView} from "./styles";

export default function InputTable(props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {

    return(
        <InputTableView>
            <input className="input-element" {...props} />
        </InputTableView>
    );
}