import type { HTMLAttributes } from "react";

function Container({ children }: HTMLAttributes<HTMLElement>) {
    return (
        <main className="min-h-svh h-full py-5">
            <div className="max-w-5xl h-full mx-auto">
                { children }
            </div>
        </main>
    )
}

export default Container;