import React from "react";
import {Switch, Route, useRouteMatch, RouteComponentProps} from 'react-router-dom';

// types
import {RouteProps} from "../../types";

// views
import EditMinimumStock from "./EditMinimumStock";
import ListMinimumStocks from "./ListMinimumStocks";

export default function MinimumStocks(props: RouteComponentProps) {
    const {path} = useRouteMatch();

    const routes: Array<RouteProps> = [
        {
            path,
            exact: true,
            component: ListMinimumStocks,
        },
        /**{
            exact: false,
            path: `${path}/:id/edit`,
            component: EditMinimumStock,
        } */
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