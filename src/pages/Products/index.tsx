import React from "react";
import {Switch, Route, useRouteMatch, RouteComponentProps} from 'react-router-dom';

// types
import {RouteProps} from "../../types";

// views
import EditProduct from "./EditProduct";
import ListProducts from "./ListProducts";

export default function Products(props: RouteComponentProps) {
    const {path} = useRouteMatch();

    const routes: Array<RouteProps> = [
        {
            path,
            exact: true,
            component: ListProducts,
        },
        {
            exact: false,
            path: `${path}/:id/edit`,
            component: EditProduct,
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