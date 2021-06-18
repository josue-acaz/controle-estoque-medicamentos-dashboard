import React, {useState} from "react";

// types
import {InputProps} from "./types";

// contexts
import {useAuth} from "../../contexts/auth/auth.context";

// styles
import {
    SignInView, 
    SignInContent, 
    Header,
    Logo,
    Footer,
    Title,
    Subtitle,
    ForgotPasswordLink,
} from "./styles";
import {
    Form,
    InputGroup, 
    PrimaryButton, 
    ButtonText,
    ErrorText,
} from "../../design";

// images
import logo from "../../assets/img/logo.png";

// components
import Input from "../../components/form/Input";
import SecureInput from "../../components/form/SecureInput";
import Circular from "../../components/spinners/Circular";

// icons
import MailOutlineIcon from '@material-ui/icons/MailOutline';


export default function SignIn() {
    const {signing, failed, failedMsg, signIn} = useAuth();
    const [submitted, setSubmitted] = useState(false);
    const [inputs, setInputs] = useState<InputProps>({
        email: "",
        password: "",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.target;
        setInputs(inputs => ({...inputs, [name]: value}));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitted(true);

        if(inputs.email && inputs.password) {
            await signIn(inputs.email, inputs.password);
        }
    }

    return(
        <SignInView>
            <SignInContent>
                <Logo src={logo} alt="logo" />
                <Header>
                    <Title>Entrar</Title>
                </Header>
                <Subtitle>Sistema de Controle de Estoque de Medicamentos</Subtitle>
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Input 
                            id="email" 
                            name="email" 
                            type="email"
                            onChange={handleChange} 
                            placeholder="Seu email"
                            error={submitted && !inputs.email}
                            adorment={<MailOutlineIcon className="icon-primary" />}
                        />
                    </InputGroup>
                    <InputGroup>
                        <SecureInput
                            id="password" 
                            name="password" 
                            value={inputs.password}
                            onChange={handleChange}
                            placeholder="Informe sua senha"
                            error={submitted && !inputs.password}
                        />
                    </InputGroup>
                    <PrimaryButton type="submit" disabled={signing}>
                        {signing ? <Circular size={30} /> : <ButtonText>Entrar</ButtonText>}
                    </PrimaryButton>
                    {failed && <ErrorText>{failedMsg}</ErrorText>}
                </Form>

                <Footer>
                    <ForgotPasswordLink href="/forgot-password">Esqueci minha senha</ForgotPasswordLink>
                </Footer>
            </SignInContent>
        </SignInView>
    );
}
