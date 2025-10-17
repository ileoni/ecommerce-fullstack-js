import { createBrowserRouter } from "react-router";

import App from "./App";
import AuthLoyout from "./layouts/AuthLayout";
import AdminLoyout from "./layouts/AdminLayout";

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
                        Component: AuthLoyout,
                        children: [
                            {
                                index: true
                            }
                        ]
                    },
                    {
                        Component: AdminLoyout
                    }
                ]
            }
        ]
    }
]);