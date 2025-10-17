import type { PropsWithChildren } from "react";

function H4({ children }: PropsWithChildren) {
    return <h4 className="first-letter:capitalize font-semibold text-4 sm:text-6">{ children }</h4>
}

export default H4;