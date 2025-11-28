import { ArrowDownWideNarrow, ArrowUpDown, ArrowUpNarrowWide } from "lucide-react";
import { useEffect, useState, type HTMLAttributes, type JSX, type MouseEvent, type ReactNode, type TableHTMLAttributes, type TdHTMLAttributes } from "react"

type SortConfigs = { key: null | string, direction: number }
type Table<T> = { getIcon: (column: string) => JSX.Element, sortConfigs: SortConfigs, toSort: (column: string) => void };

export const useTable = <T extends unknown>(data: T[] | undefined): Table<T> => {
    const [sortConfigs, setSortConfigs] = useState<SortConfigs>({
        key: null,
        direction: 0
    });

    const toSort = (column: string) => {
        let direction = 1;

        if(sortConfigs.key === column) {
            direction = (sortConfigs.direction + 1) % 3;
        }
        
        setSortConfigs({ key: column, direction });
    }

    const getIcon = (column: string) => {
        if(sortConfigs.key === column) {
            switch (sortConfigs.direction) {
                case 0:
                    return <ArrowUpDown className="size-4"/>;
                case 1:
                    return <ArrowUpNarrowWide className="size-4"/>;
                case 2:
                    return <ArrowDownWideNarrow className="size-4"/>;
                default:
                    return <ArrowUpDown className="size-4"/>;
            } 
        }
        return <ArrowUpDown className="size-4"/>;
    }

    return {
        getIcon,
        sortConfigs,
        toSort
    }
};


function Table({ children }:  TableHTMLAttributes<HTMLTableElement>) {
    return (
        <table className="min-w-full w-full table-fixed border-t border-zinc-200 dark:border-zinc-700">
            { children }
        </table>
    );
}

const Trow = ({ children }: HTMLAttributes<HTMLTableRowElement>) => {
    return <tr>{ children }</tr>;
}

const Thead = ({ children }: HTMLAttributes<HTMLTableSectionElement>) => {
    return (
        <thead>{ children }</thead>
    )
}

const Theader = (props: HTMLAttributes<HTMLTableCellElement>) => {
    const { children, className } = props;
    return (
        <th {...props} className={`px-5 py-2.5 text-start first-letter:capitalize ${className}`}>{ children }</th>
    )
}

const WithSortData = (props: { children: ReactNode, className?: string, icon: JSX.Element, column: string, onClick: (e: MouseEvent<EventTarget>, column: string ) => void } ) => {
    const { children, className, icon, onClick, column } = props;

    const handleClick = (e: MouseEvent<EventTarget>) => onClick(e, column);

    return (
        <Table.Theader className={className}>
            <div className="w-full grid grid-flow-col justify-start gap-5">
                <span className="first-letter:capitalize">
                    { children }
                </span>
                <button {...props} onClick={handleClick} className="p-1 border border-zinc-200 dark:border-zinc-700 rounded">
                    { icon }
                </button>
            </div>
        </Table.Theader>
    )
}

const Tbody = ({ children }: HTMLAttributes<HTMLTableSectionElement>) => {
    return (
        <tbody>{ children }</tbody>
    )
}

const Tdata = (props: TdHTMLAttributes<HTMLTableCellElement>) => {
    const { children, className } = props;
    return (
        <td className={`px-5 py-2.5 border-y border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 ${className}`}>{ children }</td>
    )
}


Table.Trow = Trow;
Table.Thead = Thead;
Table.Theader = Theader;
Theader.WithSortData = WithSortData;
Table.Tbody = Tbody;
Table.Tdata = Tdata;

export default Table;