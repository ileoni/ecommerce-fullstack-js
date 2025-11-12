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
import PageList from "./pages/pages/List";
import PageRegister from "./pages/pages/Register";
import Edit from "./pages/pages/Edit";
import GalleryType from "./pages/gallery-type";
import Gallery from "./pages/gallery";
import GalleryList from "./pages/gallery/List";
import GalleryRegister from "./pages/gallery/Register";
import Product from "./pages/product";
import ProductList from "./pages/product/List";

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
                                        Component: PageList,
                                        index: true,
                                    },
                                    {
                                        Component: PageRegister,
                                        path: "cadastrar"
                                    },
                                    {
                                        Component: Edit,
                                        path: "editar/:id"
                                    }
                                ]
                            },
                            {
                                Component: Gallery,
                                path: "galeria",
                                children: [
                                    {
                                        Component: GalleryList,
                                        path: "lista"
                                    },
                                    {
                                        Component: GalleryRegister,
                                        path: "cadastrar"
                                    },
                                    {
                                        Component: GalleryType,
                                        path: "categorias"
                                    }
                                ]
                            },
                            {
                                Component: Product,
                                path: "produtos",
                                children: [
                                    {
                                        Component: ProductList,
                                        path: "lista"
                                    },
                                    {
                                        path: "categorias"
                                    },
                                    {
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