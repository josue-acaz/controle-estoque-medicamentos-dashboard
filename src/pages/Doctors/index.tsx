import React from "react";
import {Switch, Route, useRouteMatch, RouteComponentProps} from 'react-router-dom';

// types
import {RouteProps} from "../../types";

// views
import EditDoctor from "./EditDoctor";
import ListDoctors from "./ListDoctors";

export default function Doctors(props: RouteComponentProps) {
    const {path} = useRouteMatch();

    const routes: Array<RouteProps> = [
        {
            path,
            exact: true,
            component: ListDoctors,
        },
        {
            exact: false,
            path: `${path}/:id/edit`,
            component: EditDoctor,
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
