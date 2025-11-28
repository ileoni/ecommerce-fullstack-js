import { X } from "lucide-react";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

type Props = {
    title: string,
    subtitle?: string,
    children?: ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>
}

function Row(props: Props) {
    const { children, subtitle, title } = props;
    return (
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-0">
            <Content {...props} subtitle={subtitle ?? ""} title={title}/>
            { children }
        </div>
    )
}

const Content = (props: { title: string, subtitle: string } & ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { onClick, subtitle, title } = props;
    return (
        <div className="grid grid-cols-[auto_1fr] items-center gap-5">
            {onClick && (
                <button {...props} className="row-end-2 col-start-3 sm:col-start-1">
                    <X />
                </button>
            )}
            <div className="flex flex-col justify-center">
                <span className="font-bold first-letter:capitalize">{title}</span>
                <span className="text-xs first-letter:capitalize">{subtitle}</span>
            </div>
        </div>
    )
}

Row.Content = Content;

export default Row;