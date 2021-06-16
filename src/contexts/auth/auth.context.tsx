import React, {createContext, useState, useEffect, useContext} from "react";
import * as auth from "./auth.service";
import api from "../../api";

// @types
import {AuthUser, AuthContextData} from './types';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [signing, setSigning] = useState(false);
    const [failed, setFailed] = useState(false);
    const [failedMsg, setFailedMsg] = useState("Ocorreu um erro.");
    const signed = !!authUser;

    useEffect(() => {
        async function loadStoragedData() {
            const storaged_user = sessionStorage.getItem("@RCAuth:user");
            const storaged_token =  sessionStorage.getItem("@RCAuth:token");

            const auth_user: AuthUser = JSON.parse(storaged_user ? storaged_user : "{}");
            if(storaged_user && storaged_token) {
                setAuthUser(auth_user);
                api.defaults.headers.Authorization = `Baerer ${storaged_token}`;
                api.defaults.headers.user_id = auth_user.id;
            }

            setLoading(false);
        }
        
        loadStoragedData();
    }, []);

    async function signIn(email: string, password: string) {
        setFailed(false);
        setSigning(true);

        try {
            const {auth_user, token} = await auth.signIn(email, password);

            setAuthUser(auth_user);
            api.defaults.headers.Authorization = `Baerer ${token}`;
            api.defaults.headers.user_id = auth_user.id;
            
            sessionStorage.setItem("@RCAuth:user", JSON.stringify(auth_user));
            sessionStorage.setItem("@RCAuth:token", token);
            setSigning(false);
        } catch (error) {
            setFailed(true);
            setSigning(false);

            if(error.response) {
                setFailedMsg(error.response.data.msg);
            }
        }
    }

    async function signOut() {
        sessionStorage.clear();
        setAuthUser(null);
    }

    return(
        <AuthContext.Provider value={{
            loading, // iniciando verificação se o usuário está logado
            signing, // o usuário está fazendo login
            signed, // o usuário está logado
            authUser, // dados do usuário logado
            failed, // o login falhou
            failedMsg, // mensagem de erro do login que falhou
            signIn, // método para executar o login
            signOut, // método para executar o sair
        }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider.");
    }

    return context;
}

export {AuthProvider, useAuth};