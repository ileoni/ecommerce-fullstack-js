import type { ComponentType } from "react";

type Props = {}

function SuccessStyle<T extends Props = Props>(Component: ComponentType<T>) {
    return (props: Omit<T, keyof Props>) => {
        return <Component {...props} className="bg-blue-500/50 hover:bg-blue-500 font-bold text-white"/>
    }
}

export default SuccessStyle;