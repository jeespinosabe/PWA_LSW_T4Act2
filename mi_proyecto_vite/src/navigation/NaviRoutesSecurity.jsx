import { createBrowserRouter } from "react-router-dom";
import Home from "../security/home/pages/Home";
import Labels from "../security/labels/pages/Labels";
import Institutes from "../security/institutes/pages/Institutes";
import Users from "../security/users/pages/Users";
import Periods from "../security/periods/pages/Periods";
import Login from "../security/login/pages/Login";
import Error from "../share/errors/pages/Error";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />, // Home envuelve todo y tiene el <Outlet />
        errorElement: <Error />,
        children: [
            // Estas pantallas se mostrarán DENTRO del <Outlet /> de Home
            { path: "/labels",      element: <Labels /> },
            { path: "/institutes",  element: <Institutes /> },
            { path: "/users",       element: <Users /> },
            { path: "/periods",     element: <Periods /> },
            { path: "/login",       element: <Login /> },
        ],
    },
]);

export default router;