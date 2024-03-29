import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            { path: "", element: <Dashboard/> }
        ]
    }
])