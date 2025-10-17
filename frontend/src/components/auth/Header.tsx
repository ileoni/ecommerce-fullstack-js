import type { PropsWithChildren } from "react";

function Header({ children }: PropsWithChildren) {
    return (
        <header className="w-full h-16 fixed bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700">
            <div className="max-w-5xl h-full mx-auto">
                { children }
            </div>
        </header>
    )
}

export default Header;