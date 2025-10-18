import type { ButtonHTMLAttributes } from "react";

function SmallButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { children, className } = props;
    return <button className={`w-fit h-10 px-4 rounded ${className}`}>{ children }</button>;
}

export default SmallButton;