import React from 'react';

import {TextAreaView} from "./styles";

const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <TextAreaView {...props} /> 
);

export default TextArea;