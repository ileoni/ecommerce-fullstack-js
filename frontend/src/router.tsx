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
import Pages from "./pages/pages";
import List from "./pages/pages/List";
import Register from "./pages/pages/Register";
import Edit from "./pages/pages/Edit";
import GalleryType from "./pages/gallery-type";

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
                                Component: Pages,
                                path: "paginas",
                                children: [
                                    {
                                        Component: List,
                                        index: true,
                                    },
                                    {
                                        Component: Register,
                                        path: "cadastrar"
                                    },
                                    {
                                        Component: Edit,
                                        path: "editar/:id"
                                    }
                                ]
                            },
                            {
                                path: "galeria",
                                children: [
                                    {
                                        Component: Dashboard,
                                        path: "lista"
                                    },
                                    {
                                        Component: GalleryType,
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