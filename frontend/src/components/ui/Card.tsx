import type { PropsWithChildren } from "react";

function Card({ children }: PropsWithChildren) {
    return (
        <div className="h-full px-5 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded">
            { children }
        </div>
    )
}

export default Card;