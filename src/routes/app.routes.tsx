import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';

// contexts
import {FeedbackProvider} from "../contexts/feedback/feedback.context";

// types
import {RouteProps} from "../types";
import {SidebarOption} from "../layout/types";

// layout
import Layout from "../layout";

// pages
import Entries from "../pages/Entries";
import Providers from "../pages/Providers";
import Categories from "../pages/Categories";
import Bases from "../pages/Bases";
import Products from "../pages/Products";
import MinimumStocks from "../pages/MinimumStocks";
import Doctors from "../pages/Doctors";
import Aircrafts from "../pages/Aircrafts";
import ExpirationDates from "../pages/ExpirationDates";
import Stocks from "../pages/Stocks";
import Transfers from "../pages/Transfers";

// icons
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import AllInboxIcon from '@material-ui/icons/AllInbox';
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import FolderIcon from '@material-ui/icons/Folder';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ViewListIcon from '@material-ui/icons/ViewList';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';

const routes: Array<RouteProps> = [
    {
        path: "/entries",
        exact: false,
        component: Entries,
    },
    {
        path: "/providers",
        exact: false,
        component: Providers,
    },
    {
        path: "/categories",
        exact: false,
        component: Categories,
    },
    {
        path: "/bases",
        exact: false,
        component: Bases,
    },
    {
        path: "/products",
        exact: false,
        component: Products,
    },
    {
        path: "/minimum-stocks",
        exact: false,
        component: MinimumStocks,
    },
    {
        path: "/doctors",
        exact: false,
        component: Doctors,
    },
    {
        path: "/aircrafts",
        exact: false,
        component: Aircrafts,
    },
    {
        path: "/expiration-dates",
        exact: false,
        component: ExpirationDates,
    },
    {
        path: "/stocks",
        exact: false,
        component: Stocks,
    },
    {
        path: "/transfers",
        exact: false,
        component: Transfers,
    }
];

const sidebarOptions: Array<SidebarOption> = [
    {
        to: "/entries",
        label: "Lançamentos",
        icon: <TrendingUpOutlinedIcon className="icon" />,
        childs: [],
    },
    {
        to: "/transfers",
        label: "Transferências",
        icon: <SwapHorizontalCircleIcon className="icon" />,
        childs: []
    },
    {
        to: "/",
        label: "Inventário",
        icon: <AllInboxIcon className="icon" />,
        childs: [
            {
                to: "/stocks",
                label: "Geral",
                icon: <ViewListIcon className="icon" />,
                childs: []
            },
            {
                to: "/expiration-dates",
                label: "Prazos de validade",
                icon: <CalendarTodayIcon className="icon" />,
                childs: []
            },
        ]
    },
    {
        to: "/",
        label: "Cadastros",
        icon: <FolderIcon className="icon" />,
        childs: [
            {
                to: "/providers",
                label: "Fornecedores",
                icon: <PeopleAltIcon className="icon" />,
                childs: [],
            },
            {
                to: "/minimum-stocks",
                label: "Estoque mínimo",
                icon: <BarChartIcon className="icon" />,
                childs: [],
            },
            {
                to: "/categories",
                label: "Categorias",
                icon: <LibraryAddCheckIcon className="icon" />,
                childs: [],
            },
            {
                to: "/products",
                label: "Medicamentos/Materiais",
                icon: <LocalHospitalIcon className="icon" />,
                childs: [],
            },
            {
                to: "/doctors",
                label: "Médicos",
                icon: <AssignmentIndIcon className="icon" />,
                childs: [],
            },
            {
                to: "/bases",
                label: "Bases",
                icon: <LocationOnIcon className="icon" />,
                childs: [],
            },
            {
                to: "/aircrafts",
                label: "Aeronaves",
                icon: <AirplanemodeActiveIcon className="icon" />,
                childs: [],
            },
        ]
    },
];

export default function AppRoutes() {
    
    return(
        <Switch>
            <Layout sidebarOptions={sidebarOptions}>
                <FeedbackProvider>
                    {routes.map((route, index) => (
                        <Route 
                            key={index} 
                            path={route.path} 
                            exact={route.exact} 
                            component={route.component}
                        />
                    ))}
                </FeedbackProvider>
                <Redirect from="*" to="/entries" />
            </Layout>
        </Switch>
    );
}
