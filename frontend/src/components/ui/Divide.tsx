import type { PropsWithChildren } from "react";

function Divide({ children }: PropsWithChildren) {
    return <div className="divide-y divide-zinc-200 dark:divide-zinc-700">{ children }</div>
}

export default Divide;