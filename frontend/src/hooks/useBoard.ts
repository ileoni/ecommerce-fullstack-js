import { useEffect, useState } from "react";

type UseBoard = { col: string, columns: string[] }

export const useBoard = <T, >({ col, columns }: UseBoard) => {
     const [initialState, setInitialState] = useState<any>([]);
    const [boardColumns, setBoardColumns] = useState<T[]>(initialState);

    const boardKeys = Object.keys(boardColumns);

    useEffect(() => {
        columns.forEach(handleForEach);
    }, [initialState]);
    
    const handleForEach = () => {
        if(!Array.isArray(initialState)) {
            setInitialState(initialState[col]);
            setBoardColumns(initialState)
        }
    }

    const findBoardColumn = <T>(columns: any, id: string) => {
        if(id in columns) return id;
        const keys = Object.keys(columns);
        const sameId = (item: { id: string } & T) => item.id === id;
        const column = keys.find(key => columns[key].find(sameId));
        return column;
    }

    const sameColumn = (column: any, value: string) => column === value;
    const nonEmptyColumn = (column: any) => (boardColumns[column] as []).length > 0;
    const nonEmptyInColumn = (column: any) => sameColumn(column, "in") && nonEmptyColumn(column);

    return {
        boardColumns,
        boardKeys,
        initialState,
        findBoardColumn,
        nonEmptyColumn,
        nonEmptyInColumn,
        sameColumn,
        setBoardColumns,
        setInitialState,
    }
}