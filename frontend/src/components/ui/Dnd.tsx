import type { ReactNode } from "react";
import {
    closestCorners,
    defaultDropAnimation,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    useDroppable,
    useSensor,
    useSensors,
    type DndContextProps
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Dnd(props: DndContextProps) {
    const { children } = props;

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    return (
        <DndContext {...props} sensors={sensors} collisionDetection={closestCorners}>
            { children }
        </DndContext>
    )
}

const Item = (props: { id: string, children: ReactNode }) => {
    const { id, children } = props;
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.1: 1
    };

    return <div {...attributes} {...listeners} ref={setNodeRef} style={style}>{children}</div>;
}

const Sortable = (props: { children: ReactNode, id: string, items?: any, title?: string }) => {
    const { children, id,  items, title } = props;
    const { setNodeRef } = useDroppable({ id });

    return (
        <div>
            {title ?? <h5>{ title }</h5>}
            <SortableContext
                id={id}
                items={items}
                strategy={verticalListSortingStrategy}
            >
                <div ref={setNodeRef}>{ children }</div>
            </SortableContext>
        </div>
    )
}

const Overlay = ({ children }: { children: ReactNode }) => {
    const dropAnimation = {...defaultDropAnimation};
    return <DragOverlay dropAnimation={dropAnimation}>{ children }</DragOverlay>
}

Dnd.Item = Item;
Dnd.Sortable = Sortable;
Dnd.Overlay = Overlay;

export default Dnd;