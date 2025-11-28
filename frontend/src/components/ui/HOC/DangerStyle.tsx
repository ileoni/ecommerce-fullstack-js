import type { ComponentType } from "react";

type Props = {}

function DangerStyle<T extends Props = Props>(Component: ComponentType<T>) {
    return (props: Omit<T, keyof Props>) => {
        return <Component   
            {...props}
            className="bg-red-400/80 hover:bg-red-400 dark:bg-red-500/80 dark:hover:bg-red-500 text-white"
        />
    }
}

export default DangerStyle;