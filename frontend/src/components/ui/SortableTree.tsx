import { closestCenter, DndContext, DragOverlay, KeyboardSensor, PointerSensor, useDraggable, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

const data = [
    { id: 1, key: "teste-1" },
    { id: 2, key: "teste-2" },
    { id: 3, key: "teste-3" },
    { id: 4, key: "teste-4" },
    { id: 5, key: "teste-5" },
    { id: 6, key: "teste-6" }
]

function SortableTree() {
    const [items, setItems] = useState(data);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
    
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);
                
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {items.map((item, index) => (
                    <SortableTree.Item key={index} id={`teste-${index}`}>{ item.key }</SortableTree.Item>
                ))}
            </SortableContext>
            <DragOverlay>
                <SortableTree.Item id={`teste-0`}>teste-0</SortableTree.Item>
            </DragOverlay>
        </DndContext>
    )
}

const Item = (props: any) => {
    const { children, id } = props;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    
    return (
        <li {...attributes} {...listeners} ref={setNodeRef} className="dash" style={style}>
            { children }
        </li>
    )
}

SortableTree.Item = Item;

export default SortableTree;