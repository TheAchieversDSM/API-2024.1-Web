import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import App from "../App";
import Upload from "../pages/Upload";
import Login from "../pages/Login";

export const router = createBrowserRouter([
    {
        path: "",
        element: <App/>,
        children: [
            { path: "", element: <Login/> },
            { path: "dashboard", element: <Dashboard/> },
            { path: "upload", element: <Upload/> },
        ]
    }
])