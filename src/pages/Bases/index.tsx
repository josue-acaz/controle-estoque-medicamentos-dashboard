import React from "react";
import {Switch, Route, useRouteMatch, RouteComponentProps} from 'react-router-dom';

// types
import {RouteProps} from "../../types";

// views
import EditBase from "./EditBase";
import ListBases from "./ListBases";

export default function Bases(props: RouteComponentProps) {
    const {path} = useRouteMatch();

    const routes: Array<RouteProps> = [
        {
            path,
            exact: true,
            component: ListBases,
        },
        {
            exact: false,
            path: `${path}/:id/edit`,
            component: EditBase,
        }
    ];

    return(
        <Switch>
            {routes.map((route, index) => (
                <Route 
                    key={index} 
                    path={route.path}
                    exact={route.exact} 
                    component={route.component}
                />
            ))}
        </Switch>
    );
}