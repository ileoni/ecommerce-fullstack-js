import { ArrowDownWideNarrow, ArrowUpDown, ArrowUpNarrowWide } from "lucide-react";
import { useState } from "react";

type SortConfigs = { key: null | string, orderType: number }

export const useTable = ({ records }: { records: any }) => {
    const [sortConfigs, setSortConfigs] = useState<SortConfigs>({ key: null, orderType: 0 });
    
    const toSort = (column: string, callback: (query: string) => void) => {
        let orderType = 1;
        
        if(sortConfigs.key === column) {
            orderType = (sortConfigs.orderType + 1) % 3;
        }
        
        setSortConfigs({ key: column, orderType });

        const query = `?orderType=${orderType}&column=${column}&page=${records?.currentPage}`;
        callback(query);
    }
    
    const getIcon = (column: string) => {
        if(sortConfigs.key === column) {
            if(sortConfigs.orderType === 0) {
                return <ArrowUpDown className="size-4"/>;
            } else if(sortConfigs.orderType === 1) {
                return <ArrowUpNarrowWide className="size-4"/>;
            } else if(sortConfigs.orderType === 2) {
                return <ArrowDownWideNarrow className="size-4"/>;
            } else {
                return <ArrowUpDown className="size-4"/>;
            }
        }

        return <ArrowUpDown className="size-4"/>;
    }
    
    return {
        getIcon,
        toSort
    }
}