import { useEffect, useState } from "react";
import { useBoard } from "../../hooks/useBoard";
import Dnd from "./Dnd";
import type { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

type Item = { id: number, path: string }

function DraggingAndDropping() {
    const {
        boardColumns,
        boardKeys,
        findBoardColumn,
        initialState,
        sameColumn,
        setBoardColumns,
        setInitialState,
    } = useBoard<Item[]>({ col: "out", columns: ["in", "out"] });

    const [maximumColumnLength] = useState(3);
    const [activatedId, setActivetedId] = useState<string | number | null>(null);

    const item: any = activatedId ? initialState.find((item: Item) => item.id === activatedId): null;

    useEffect(() => {
        update();
    }, []);

    const update = () => {
        setInitialState({
            in: [],
            out: [
                { id: 1, path: "https://picsum.photos/800/200?random=1" },
                { id: 2, path: "https://picsum.photos/800/200?random=2" },
                { id: 3, path: "https://picsum.photos/800/200?random=3" },
                { id: 4, path: "https://picsum.photos/800/200?random=4" },
                { id: 5, path: "https://picsum.photos/800/200?random=5" },
                { id: 6, path: "https://picsum.photos/800/200?random=6" },
                { id: 7, path: "https://picsum.photos/800/200?random=7" },
                { id: 8, path: "https://picsum.photos/800/200?random=8" },
                { id: 9, path: "https://picsum.photos/800/200?random=9" },
                { id: 10, path: "https://picsum.photos/800/200?random=10" },
                { id: 11, path: "https://picsum.photos/800/200?random=11" },
                { id: 12, path: "https://picsum.photos/800/200?random=12" },
                { id: 13, path: "https://picsum.photos/800/200?random=13" },
                { id: 14, path: "https://picsum.photos/800/200?random=14" },
                { id: 15, path: "https://picsum.photos/800/200?random=15" },
                { id: 16, path: "https://picsum.photos/800/200?random=16" },
                { id: 17, path: "https://picsum.photos/800/200?random=17" },
            ]
        });
    }
    
    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        const activeColumn = findBoardColumn(boardColumns, active.id as string);
        const overColumn = findBoardColumn(boardColumns, over?.id as string);

        if(
            !activeColumn ||
            !overColumn ||
            activeColumn === overColumn
        ) {
            return;
        }

        if(overColumn === "in") {
            if((boardColumns[overColumn as any].length + 1) > maximumColumnLength) return;
        }

        setBoardColumns((boardColumns: any) => {
            const activeItems = boardColumns[activeColumn];
            const overItems = boardColumns[overColumn];
            
            const activeIndex = activeItems.findIndex((item: any) => item.id === active.id);
            const overIndex = overItems.findIndex((item: any) => item.id !== over?.id);

            return {
                ...boardColumns,
                [activeColumn]: [
                    ...boardColumns[activeColumn].filter((item: any) => item.id !== active.id)
                ],
                [overColumn]: [
                    ...boardColumns[overColumn].slice(0, overIndex),
                    boardColumns[activeColumn][activeIndex],
                    ...boardColumns[overColumn].slice(overIndex, boardColumns[overColumn].length)
                ]
            }
        })
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        const activeColumn: any = findBoardColumn(boardColumns, active.id as string);
        const overColumn: any = findBoardColumn(boardColumns, over?.id as string);

        if(
            !activeColumn ||
            !overColumn ||
            activeColumn !== overColumn
        ) {
            return;
        }
        
        const activeIndex = boardColumns[activeColumn].findIndex((item: any) => item.id === active.id);
        const overIndex = boardColumns[overColumn].findIndex((item: any) => item.id === over?.id);

        if(activeIndex !== overIndex) {
            setBoardColumns((boardColumns: any) => ({
                ...boardColumns,
                [overColumn]: arrayMove(boardColumns[overColumn], activeIndex, overIndex)
            }))
        }

        setActivetedId(null);
    }

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActivetedId(active.id);
    }

    return (
        <Dnd
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragStart={handleDragStart}
        >
            <div className="grid sm:grid-cols-2 gap-5">
                {boardKeys.map((column: any, index) => (
                    <Dnd.Sortable
                        key={index}
                        id={column}
                        items={boardColumns[column]}
                    >
                        <div 
                            className="min-h-32 p-5 grid gap-5 border border-zinc-200 dark:border-zinc-700 rounded-2xl"
                            style={{
                                maxHeight: sameColumn("in", column) ? "": "calc(var(--spacing) * 96)",
                                overflowY: sameColumn("in", column) ? "hidden": "auto"
                            }}
                        >
                            {boardColumns[column].map((item: any, index: number) => (
                                <Dnd.Item key={index} id={item.id}>
                                    <img src={item.path} alt="" className="rounded-2xl"/>
                                </Dnd.Item>
                            ))}
                        </div>
                        <div 
                            className="py-5 grid grid-flow-col justify-between"
                            style={{visibility: sameColumn("in", column) ? "visible": "hidden"}}
                        >
                            <span className="first-letter:capitalize text-xs">arraste e solte</span>
                            <span className="text-xs">{boardColumns[column].length} / {maximumColumnLength}</span>
                        </div>
                    </Dnd.Sortable>
                ))}
                <Dnd.Overlay>
                    {item ? (
                        <Dnd.Item id={item.id}>
                            <img src={item.path} alt="" />
                        </Dnd.Item>
                    ): null}
                </Dnd.Overlay>
            </div>
        </Dnd>
    )
}

export default DraggingAndDropping;