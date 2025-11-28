import type { ButtonHTMLAttributes, ComponentType } from "react";


function IconButtonStyle(Component: ComponentType) {
    return (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
        const { className } = props;
        return (
            <button {...props} className={`cursor-pointer p-2 rounded-full ${className}`}>
                <Component/>
            </button>
        );
    }
}

export default IconButtonStyle;