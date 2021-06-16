import api from "../../api";

// types
import {AuthResponse} from "./types";

export async function signIn(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post("/sessions", {
        email,
        password,
    });

    return response.data;
}