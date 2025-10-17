import type { PropsWithChildren } from "react";

function H3({ children }: PropsWithChildren) {
    return <h3 className="first-letter:capitalize font-semibold text-6 sm:text-8">{ children }</h3>
}

export default H3;