import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';

// types
import {RouteProps} from "../types";

// pages
import SignIn from "../pages/SignIn";

const routes: Array<RouteProps> = [
    {
        path: "/login",
        exact: false,
        component: SignIn,
    }
];

export default function AuthRoutes() {
    
    return(
        <Switch>
            {routes.map((route, index) => (
                <Route key={index} exact={route.exact} component={route.component} />
            ))}
            <Redirect from="*" to="/login" />
        </Switch>
    );
}