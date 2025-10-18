import type { PropsWithChildren } from "react";

function Container({ children }: PropsWithChildren) {
    return (
        <main className="h-svh py-16">
            <div className="h-full py-8">
                <div className="max-w-5xl mx-auto h-full">
                    { children }
                </div>
            </div>
        </main>
    )
}

export default Container;