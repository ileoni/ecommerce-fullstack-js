import type { HTMLAttributes } from "react";
import { Plus } from "lucide-react";

function PlusButton(props: HTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className="p-2 cursor-pointer bg-red-400/90 hover:bg-red-400 text-white rounded-full">
            <Plus />
        </button>
    )
}

export default PlusButton;