import React from "react";

// contexts
import {useAuth} from "../contexts/auth/auth.context";

// routes
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

// components
import Starting from "../components/spinners/Starting";

export default function Routes() {
    const {signed, loading} = useAuth();

    if(loading) {
        return <Starting />;
    }

    return signed ? <AppRoutes /> : <AuthRoutes />;
}