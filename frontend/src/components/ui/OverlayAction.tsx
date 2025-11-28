import { Pin, PinOff } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

function OverlayAction(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { children } = props;
    return (
        <div className="max-w-32 relative">
            <div className="w-full p-1 absolute flex flex-wrap gap-2 justify-end">
                <button {...props} className="p-1 bg-red-400/70 hover:bg-red-400 text-white rounded-full">
                    {<Pin/>}
                </button>
            </div>
            { children }
        </div>
    )
}

export default OverlayAction;