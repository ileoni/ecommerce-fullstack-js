import type { PropsWithChildren } from "react";

function H5({ children }: PropsWithChildren) {
    return <h5 className="first-letter:capitalize font-normal text-3 sm:text-4">{ children }</h5>
}

export default H5;