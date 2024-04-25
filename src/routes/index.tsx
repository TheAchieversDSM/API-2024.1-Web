import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import App from "../App";
import Upload from "../pages/Upload";
import Login from "../pages/Login";
import CreateUser from "../pages/Create";

export const router = createBrowserRouter([
    {
        path: "",
        element: <App/>,
        children: [
            { path: "", element: <Login/> },
            { path: "dashboard", element: <Dashboard/> },
            { path: "upload", element: <Upload/> },
            { path: "cadastro-usuarios", element: <CreateUser/> }
        ]
    }
])