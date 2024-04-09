import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import App from "../App";
import Upload from "../pages/Upload";

export const router = createBrowserRouter([
    {
        path: "",
        element: <App/>,
        children: [
            { path: "", element: <Dashboard/> },
            { path: "upload", element: <Upload/> },
        ]
    }
])