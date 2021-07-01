import React from "react";
import {Switch, Route, useRouteMatch, RouteComponentProps} from 'react-router-dom';

// types
import {RouteProps} from "../../types";

// views
import ListTransfers from "./ListTransfers";
import EditTransfer from "./EditTransfer";

export default function Transfers(props: RouteComponentProps) {
    const {path} = useRouteMatch();

    const routes: Array<RouteProps> = [
        {
            path,
            exact: true,
            component: ListTransfers,
        },
        {
            exact: false,
            path: `${path}/:id/edit`,
            component: EditTransfer,
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