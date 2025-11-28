import { AlertTriangle } from "lucide-react";
import type { ComponentType } from "react";

type Props = {}

function AlertWarningStyle<T extends Props = Props>(Component: ComponentType<T>) {
    return (props: Omit<T, keyof Props>) => {
        return (
            <div className="px-5 py-3 grid grid-flow-col gap-5 absolute bottom-5 right-5 bg-orange-400/20 dark:bg-orange-400/50 border border-orange-500 rounded">
                <AlertTriangle className="stroke-orange-400 dark:stroke-white"/>
                <Component {...props} />
            </div>
        )
    }
}

export default AlertWarningStyle;