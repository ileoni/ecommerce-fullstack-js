import type { LabelHTMLAttributes } from "react";

function Label(props: { filled?: boolean, id?: string, isDirty?: boolean, label?: string, message?: string } & LabelHTMLAttributes<HTMLLabelElement>) {
    const { children, filled, id, isDirty, label, message } = props;

    return (
        <label htmlFor={id} className={`group relative grid border border-zinc-200 dark:border-zinc-700 ${ message ? "border-red-400/50! dark:border-red-500/50!" : "" } rounded`}>
            { children }
            <div
                className={`grid group-has-[input,select]:items-center absolute inset-0 group-has-[textarea]:top-6 left-5 right-auto group-has-[input:focus,textarea:focus,select:focus]:-translate-y-5 ${ isDirty ? "-translate-y-5 text-xs" : ""} ${ filled ? "-translate-y-5 text-xs" : ""} group-has-[input:focus,textarea:focus,select:focus]:text-xs transition-[transform_font-size]`}
            >
                <span className="first-letter:capitalize">{ label }</span>
            </div>
            {
                message && (
                    <div
                        className={`grid absolute bottom-1 left-5 text-xs text-red-400 dark:text-red-500`}
                    >
                        <span className="first-letter:capitalize">{ message }</span>
                    </div>
                )
            }
        </label>
    )
}

export default Label;