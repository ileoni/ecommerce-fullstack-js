import { createBrowserRouter } from "react-router";

import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PreSend from "./pages/PreSend";
import Dashboard from "./pages/Dashboard";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import ValidateCode from "./pages/ValidateCode";
import ResetPassword from "./pages/ResetPassword";

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
                            },
                            {
                                Component: PreSend,
                                path: "pre-envio"
                            },
                            {
                                Component: ValidateCode,
                                path: "validar-codigo"
                            },
                            {
                                Component: ResetPassword,
                                path: "redefinir-senha"
                            }
                        ]
                    },
                    {
                        Component: AdminLayout,
                        children: [
                            {
                                Component: Dashboard,
                                path: "painel"
                            },
                            {
                                Component: Dashboard,
                                path: "paginas"
                            },
                            {
                                Component: Dashboard,
                                path: "galeria",
                                children: [
                                    {
                                        Component: Dashboard,
                                        path: "lista"
                                    },
                                    {
                                        Component: Dashboard,
                                        path: "categorias"
                                    }
                                ]
                            },
                            {
                                Component: Dashboard,
                                path: "produtos",
                                children: [
                                    {
                                        Component: Dashboard,
                                        path: "lista"
                                    },
                                    {
                                        Component: Dashboard,
                                        path: "categorias"
                                    },
                                    {
                                        Component: Dashboard,
                                        path: "coupons"
                                    }
                                ]
                            },
                            {
                                Component: Dashboard,
                                path: "pedidos"
                            },
                            {
                                Component: Dashboard,
                                path: "usuarios"
                            },
                            {
                                Component: Dashboard,
                                path: "configuracao"
                            },
                            {
                                Component: Profile,
                                path: "perfil"
                            },
                            {
                                Component: Dashboard,
                                path: "sair"
                            },
                        ]
                    } 
                ]
            }
        ]
    }
]);