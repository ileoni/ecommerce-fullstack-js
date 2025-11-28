import type { PropsWithChildren } from "react";

function Footer({ children }: PropsWithChildren) {
    return <footer className="w-full h-16 px-4 lg:px-0 grid items-center bg-white dark:bg-zinc-800 border-t border-t-zinc-200 dark:border-t-zinc-700 font-semibold text-xs sm:text-sm text-center">{ children }</footer>
}

export default Footer;