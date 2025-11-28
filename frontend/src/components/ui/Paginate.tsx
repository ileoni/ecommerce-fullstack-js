import { ArrowLeft, ArrowLeftToLine, ArrowRight, ArrowRightToLine } from "lucide-react";
import type { PropsWithChildren } from "react";

type Props = {
    data: any,
    onFirstPage: (endpoint: string) => void
    onPrevious: (endpoint: string) => void
    onNext: (endpoint: string) => void
    onLastPage: (endpoint: string) => void
    onPageTo: (endpoint: string) => void
} & PropsWithChildren;

function Paginate(props: Props) {
    const {
        data,
        onFirstPage,
        onPrevious,
        onNext,
        onLastPage,
        onPageTo,
    } = props;

    return (
        <div className="py-5 grid grid-cols-2 items-center">
            <small className="first-letter:capitalize">
                {data && (
                    <span>
                        mostrando página {data.currentPage + 1} a {data.records.length} de {data.totalRecords} entradas
                    </span>
                )}
            </small>
            <nav>
                <ul className="flex flex-row justify-end gap-5 items-center">
                    <li>
                        <button
                            onClick={() => onFirstPage(data.startPageIndex)}
                            className="disabled:opacity-50"
                            disabled={!data?.startPageIndex}
                        >
                            <ArrowLeftToLine className="size-4"/>
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => onPrevious(data.previousPageIndex)}
                            className="disabled:opacity-50"
                            disabled={!data?.previousPageIndex}
                        >
                            <ArrowLeft className="size-4"/>
                        </button>
                    </li>
                    <li>
                        <ul className="grid grid-flow-col gap-2">
                            {data && data.pageIndexes.map((page: string, index: number) => (
                                <li key={index}>
                                    <button onClick={() => onPageTo(page)} className={`size-8 font-bold border ${page !== null ? "" : "opacity-50"} border-zinc-200 dark:border-zinc-700 rounded`}>
                                        { index + 1 }
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        <button
                            onClick={() => onNext(data.nextPageIndex)}
                            className="disabled:opacity-50"
                            disabled={!data?.nextPageIndex}
                        >
                            <ArrowRight className="size-4"/>
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => onLastPage(data.endPageIndex)}
                            className="disabled:opacity-50"
                            disabled={!data?.endPageIndex}
                        >
                            <ArrowRightToLine className="size-4"/>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Paginate;