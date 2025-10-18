type Options = { title?: string, subtitle?: string, slug?: string, isVisible?: boolean, children?: any }

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
            })
        },
        authenticate: {}
    }
}