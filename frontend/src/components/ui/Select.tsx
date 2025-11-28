import { useRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

import { useLucideIconToDataUri } from "../../hooks/useLucideIconToDatauri";
import Label from "./Label";

type Props = { label?: string, message?: string } & SelectHTMLAttributes<HTMLSelectElement>;

function Select(props: Props) {
    const { children, label } = props;

    const selectRef = useRef(null);

    const chevronDown = useLucideIconToDataUri(ChevronDown)
    
    const style: any = {
        "--lucide-chevron-down": chevronDown
    }

    return (
        <Label label={label} filled={true}>
            <select
                {...props}
                className="px-5 py-6 bg-white dark:bg-zinc-800 outline-none"
                ref={selectRef}
                style={style}

            >
                { children }
            </select>
        </Label>
    )
}

export default Select;