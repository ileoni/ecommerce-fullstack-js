import type { ButtonHTMLAttributes } from "react";

function MediumButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { children, className } = props;
    return <button {...props} className={`w-fit h-14 px-6 rounded ${className}`}>{ children }</button>;
}

export default MediumButton;