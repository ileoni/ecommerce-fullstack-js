import { forwardRef, type ForwardedRef, type HTMLAttributes, type PropsWithChildren } from "react";

function Card({ children, className }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`h-full px-5 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded ${ className }`}>
            { children }
        </div>
    )
}

export const withRef = forwardRef(({ children, className }: PropsWithChildren & HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className={`h-full px-5 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded ${className}`}>
            { children }
        </div>
    )
})

Card.withRef = withRef;

export default Card;