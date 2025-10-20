1. Adicionar nova página no administrador
    - Adicionar nova rota. \
        *src/router.tsx*
        ``` javascript
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
                                    // Adicionar nova rota aqui
                                ]
                            }
                        ]
                    }
                ]
            }
        ]);
    
    - Para adicionar rota as configurações. \
        *src/configs/menus.ts*
        ``` javascript
        export default {
            admin: {
                deauthenticate: {
                    login: {
                        title: "",
                        subtitle: "",
                        slug: ""
                    },
                    // adicionar nova rota aqui
                },
                authenticate: {}
            }
        }