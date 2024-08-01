import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    closestCenter,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    horizontalListSortingStrategy,
    SortableContext,
} from '@dnd-kit/sortable';

const DragIndexContext = createContext({
    active: -1,
    over: -1,
});

export const useDragIndex = () => useContext(DragIndexContext);

const DragAndDropContext = ({ children, items, setItems }) => {
    const [dragIndex, setDragIndex] = useState({
        active: -1,
        over: -1,
    });

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 1,
            },
        }),
    );

    const onDragEnd = ({ active, over }) => {
        console.log(1)
        if (active.id !== over?.id) {
            setItems((prevState) => {
                const activeIndex = prevState.findIndex((i) => i.key === active?.id);
                const overIndex = prevState.findIndex((i) => i.key === over?.id);
                return arrayMove(prevState, activeIndex, overIndex);
            });
        }
        setDragIndex({
            active: -1,
            over: -1,
        });
    };

    const onDragOver = ({ active, over }) => {
        const activeIndex = items.findIndex((i) => i.key === active.id);
        const overIndex = items.findIndex((i) => i.key === over?.id);
        setDragIndex({
            active: active.id,
            over: over?.id,
            direction: overIndex > activeIndex ? 'right' : 'left',
        });
    };

    return (
        <DndContext
            sensors={sensors}
            modifiers={[restrictToHorizontalAxis]}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            collisionDetection={closestCenter}
        >
            <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
                <DragIndexContext.Provider value={dragIndex}>
                    {children}
                </DragIndexContext.Provider>
            </SortableContext>
            <DragOverlay>
                <th style={{ backgroundColor: 'gray', padding: 16 }}>
                    {items[items.findIndex((i) => i.key === dragIndex.active)]?.title}
                </th>
            </DragOverlay>
        </DndContext>
    );
};

DragAndDropContext.propTypes = {
    children: PropTypes.node,
    items: PropTypes.array,
    setItems: PropTypes.func,
};

export default DragAndDropContext;
