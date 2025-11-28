import { AlertCircle } from "lucide-react";
import type { ComponentType } from "react";

type Props = {}

function AlertDangerStyle<T extends Props = Props>(Component: ComponentType<T>) {
    return (props: Omit<T, keyof Props>) => {
        return (
            <div {...props}  className="px-5 py-3 grid grid-flow-col gap-5 absolute bottom-5 right-5 bg-red-400/20 dark:bg-red-400/50 border border-red-500 rounded">
                <AlertCircle className="stroke-red-400 dark:stroke-white"/>
                <Component {...props}/>
            </div>
        )
    }
}

export default AlertDangerStyle;