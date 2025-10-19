import type { ButtonHTMLAttributes } from "react";

function ExtraSmallButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { children, className } = props;
    return <button {...props} className={`w-fit h-8 px-3 disabled:bg-gray-200 disabled:text-gray-300 dark:disabled:bg-gray-400 dark:disabled:text-gray-500/50 rounded ${className}`}>{ children }</button>;
}

export default ExtraSmallButton;