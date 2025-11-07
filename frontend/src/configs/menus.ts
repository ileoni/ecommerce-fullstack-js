type Children = { visible?: any, hidden?: any }
type Options = { title?: string, subtitle?: string, slug?: string, isVisible?: boolean, children?: Children }

const setAttributes = (options: Options) => options;

export default {
    admin: {
        deauthenticate: {
            login: setAttributes({
                title: "seja bem vindo",
                subtitle: "administrador",
                slug: "/"
            }),
            preSend: setAttributes({
                title: "digite o email de",
                subtitle: "recuperação",
                slug: "pre-envio"
            }),
            validateCode: setAttributes({
                title: "validar seu",
                subtitle: "código de confirmação",
                slug: "validar-codigo"
            }),
            resetPassword: setAttributes({
                title: "criar nova",
                subtitle: "senha",
                slug: "redefinir-senha"
            }),
        },
        authenticate: {
            dashboard: setAttributes({
                title: "painel",
                slug: "painel",
                isVisible: true,
            }),
            pages: setAttributes({
                title: "páginas",
                slug: "paginas",
                isVisible: true,
                children: {
                    hidden: {
                        register: setAttributes({
                            slug: "cadastrar"
                        }),
                        edit: setAttributes({
                            slug: "editar"
                        })
                    }
                }
            }),
            gallery: setAttributes({
                title: "galeria",
                slug: "galeria",
                isVisible: true,
                children: {
                    visible: {
                        list: setAttributes({
                            title: "lista",
                            slug: "galeria/lista"
                        }),
                        categories: setAttributes({
                            title: "categorias",
                            slug: "galeria/categorias"
                        }),
                    },
                    hidden: {
                        register: setAttributes({
                            slug: "../cadastrar",
                            isVisible: false
                        })
                    }
                }
            }),
            product: setAttributes({
                title: "produtos",
                slug: "produtos",
                isVisible: true,
                children: {
                    visible: {
                        list: setAttributes({
                            title: "lista",
                            slug: "produtos/lista"
                        }),
                        categories: setAttributes({
                            title: "categorias",
                            slug: "produtos/categorias"
                        }),
                        cupons: setAttributes({
                            title: "coupons",
                            slug: "produtos/coupons"
                        }),
                    }
                }
            }),
            orders: setAttributes({
                title: "pedidos",
                slug: "pedidos",
                isVisible: true,
            }),
            users: setAttributes({
                title: "usuários",
                slug: "usuarios",
                isVisible: true,
            }),
            settings: setAttributes({
                title: "configurações",
                slug: "configuracao",
                isVisible: true,
            }),
            profile: setAttributes({
                title: "perfil",
                slug: "perfil",
                isVisible: false,
            }),
            logout: setAttributes({
                title: "sair",
                slug: "sair",
                isVisible: false,
            }),
        }
    }
}