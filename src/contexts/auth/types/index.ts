interface AuthUser {
    id: string;
    name: string;
    email: string;
    phone_number: string;
};

interface AuthContextData {
    loading: boolean; // iniciando verificação se o usuário está logado
    signing: boolean; // o usuário está fazendo login
    signed: boolean; // o usuário está logado
    authUser: AuthUser | null; // dados do usuário logado
    failed: boolean; // o login falhou
    failedMsg?: string; // mensagem de erro do login que falhou
    signIn(email: string, password: string): Promise<void>;
    signOut(): void;
};

interface AuthResponse {
    token: string;
    auth_user: AuthUser;
};

export type {
    AuthUser, 
    AuthContextData, 
    AuthResponse,
};