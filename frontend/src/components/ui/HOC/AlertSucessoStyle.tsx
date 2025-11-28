import { CheckCircle2Icon } from "lucide-react";
import type { ComponentType } from "react";

type Props = {}

function AlertSuccessStyle<T extends Props = Props>(Component: ComponentType<T>) {
    return (props: Omit<T, keyof Props>) => {
        return (
            <div className="px-5 py-3 grid grid-flow-col gap-5 absolute bottom-5 right-5 bg-green-400/20 dark:bg-green-400/50 border border-green-500 rounded">
                <CheckCircle2Icon className="stroke-green-400 dark:stroke-white"/>
                <Component {...props} />
            </div>
        )
    }
}

export default AlertSuccessStyle;