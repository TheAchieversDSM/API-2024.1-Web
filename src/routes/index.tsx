import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import App from "../App";

export const router = createBrowserRouter([
    {
        path: "",
        element: <App/>,
        children: [
            { path: "", element: <Dashboard/> }
        ]
    }
])