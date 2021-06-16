import React from "react";

// images
import logo from "../../../assets/img/logo.png";

// styles
import {
    StartingView, 
    StartingContent, 
    Spinner,
    Header,
    Title,
    Subtitle,
    Logo, 
} from "./styles";

const Starting = () => (
    <StartingView>
        <StartingContent>
            <Header>
                <Logo src={logo} alt="logo" />
                <Spinner /> 
            </Header>
            <Title>Controle de Estoque de Medicamentos</Title>
            <Subtitle>Inicializando...</Subtitle>
        </StartingContent>
    </StartingView>
);

export default Starting;