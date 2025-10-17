import type { PropsWithChildren } from "react";

function H1({ children }: PropsWithChildren) {
    return <h1 className="first-letter:capitalize font-bold text-10 sm:text-12">{ children }</h1>
}

export default H1;