import { Info } from "lucide-react";
import type { ComponentType } from "react";

type Props = {}

function AlertInfoStyle<T extends Props = Props>(Component: ComponentType<T>) {
    return (props: Omit<T, keyof Props>) => {
        return (
            <div className="px-5 py-3 grid grid-flow-col gap-5 absolute bottom-5 right-5 bg-blue-400/20 dark:bg-blue-400/50 border border-blue-500 rounded">
                <Info className="stroke-blue-400 dark:stroke-white"/>
                <Component {...props} />
            </div>
        )
    }
}

export default AlertInfoStyle;