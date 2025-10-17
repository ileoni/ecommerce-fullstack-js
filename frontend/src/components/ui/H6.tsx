import type { PropsWithChildren } from "react";

function H6({ children }: PropsWithChildren) {
    return <h6 className="first-letter:capitalize font-normal text-3">{ children }</h6>
}

export default H6;