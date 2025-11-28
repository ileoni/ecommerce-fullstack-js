import type { ComponentType } from "react";

type Props = {}

function EditNavLinkStyle<T extends Props = Props>(Component: ComponentType<T>) {
    return (props: Omit<T, keyof Props>) => {
        return <Component
            {...props}
            className=""
        />
    }
}

export default EditNavLinkStyle;