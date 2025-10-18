import type { ButtonHTMLAttributes } from "react";

function ExtraSmallButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { children, className } = props;
    return <button className={`w-fit h-8 px-3 rounded ${className}`}>{ children }</button>;
}

export default ExtraSmallButton;