import type { ComponentType } from "react";

type Props = {}

function DefaultStyle<T extends Props = Props>(Component: ComponentType<T>) {
    return (props: Omit<T, keyof Props>) => {
        return <Component {...props} className="bg-gray-300/50 hover:bg-gray-300 dark:bg-gray-500/50 dark:hover:bg-gray-500 text-zinc-800 dark:text-zinc-50"/>
    }
}

export default DefaultStyle;