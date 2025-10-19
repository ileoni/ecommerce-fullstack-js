import type { InputHTMLAttributes } from "react";

type Props = { label?: string, message?: string, float?: boolean } & InputHTMLAttributes<HTMLInputElement>;

function Label(props: Props) {
    const {
        children,
        id,
        label,
        message,
        float
    } = props;
    
    return (
        <label htmlFor={id} className="group sm:min-w-96 w-full mt-2 mb-5 relative grid items-center bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-full">
            { children }
            <span className={`absolute left-4 group-has-[input:focus]:-translate-y-5 group-has-[input:focus]:text-xs ${float ? "-translate-y-5 text-xs": ""} transition-all`}>{ label }</span>
            <span className="absolute left-4 -bottom-4.5 text-xs text-red-400 dark:text-red-300">{ message }</span>
        </label>
    );
}

export default Label;