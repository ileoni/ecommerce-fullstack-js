import type { PropsWithChildren } from "react";

function H2({ children }: PropsWithChildren) {
    return <h2 className="first-letter:capitalize font-bold text-8 sm:text-10">{ children }</h2>
}

export default H2;