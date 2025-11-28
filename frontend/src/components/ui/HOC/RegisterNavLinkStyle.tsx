import type { ComponentType } from "react";

type Props = {}

function RegisterNavLinkStyle<T extends Props = Props>(Component: ComponentType<T>) {
    return (props: Omit<T, keyof Props>) => {
        return <Component
            {...props}
            className="w-fit h-8 px-3 grid place-content-center bg-red-400/90 hover:bg-red-400 dark:bg-red-500/90 hover:dark:bg-red-500 font-bold text-white rounded"
        />
    }
}

export default RegisterNavLinkStyle;