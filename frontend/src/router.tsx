import { createBrowserRouter } from "react-router";

import App from "./App";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Login";

export const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                index: true
            },
            {
                path: "administrador",
                children: [
                    {
                        Component: AuthLayout,
                        children: [
                            {
                                Component: Login,
                                index: true
                            }
                        ]
                    },
                    {
                        Component: AdminLayout
                    }
                ]
            }
        ]
    }
]);