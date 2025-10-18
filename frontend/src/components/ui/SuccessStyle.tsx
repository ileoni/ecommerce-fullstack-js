import type { ComponentType } from "react";

type Props = {}

function SuccessStyle<T extends Props = Props>(Component: ComponentType<T>) {
    return (props: Omit<T, keyof Props>) => {
        return <Component {...props} className="bg-blue-400 text-white"/>
    }
}

export default SuccessStyle;