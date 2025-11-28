import type { PropsWithChildren } from "react";

function Header({ children }: PropsWithChildren) {
    return (
        <header className="size-full bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-b-zinc-700">
            <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
                { children }
            </div>
        </header>
    )
}

export default Header;