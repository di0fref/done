import React, {useEffect, useState} from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {SortableItem} from './SortableItem';

export default function DndKitList(props) {
    const [items, setItems] = useState([
        {
            name: "kalle",
            id: "1",
            sort: "1"
        },
        {
            name: "Pelle",
            id: "2",
            sort: "2"
        }
    ]);
    // const [items, setItems] = useState([]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    // useEffect(() => {
    //     setItems(props.cards)
    // }, [props])

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
                {items.map(item => <SortableItem item={item} key={item.id} id={item.id}/>)}
                {/*{items.map((item, index) => <SortableItem key={item.id} item={item} id={item.id}/>)}*/}

            </SortableContext>
        </DndContext>
    );

    function handleDragEnd(event) {
        const {active, over} = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }
}