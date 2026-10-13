import React, {useCallback, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {
  defaultRangeExtractor,
  useVirtualizer,
  type Range,
} from '@tanstack/react-virtual';

import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
} from '@lucasols/dnd-kit-core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
} from '@lucasols/dnd-kit-sortable';

import styles from './Virtualized.module.css';

import {createRange} from '../../utilities';
import {SortableItem, Props} from './Sortable';
import {Item, Wrapper} from '../../components';

export default {
  title: 'Presets/Sortable/Virtualized',
};

function Sortable({
  adjustScale = false,
  strategy = verticalListSortingStrategy,
  itemCount = 100,
  handle = false,
  getItemStyles = () => ({}),
  modifiers,
}: Props) {
  const [items, setItems] = useState(() =>
    createRange<UniqueIdentifier>(itemCount, (index) => `${index + 1}`)
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      // Disable smooth scrolling in Cypress automated tests
      scrollBehavior: 'Cypress' in window ? 'auto' : undefined,
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const getIndex = (id: UniqueIdentifier) => items.indexOf(id);
  const activeIndex = activeId ? getIndex(activeId) : -1;
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollElementRef.current,
    estimateSize: () => 64,
    overscan: 3,
    // Keep the active item mounted while it is scrolled out of view
    rangeExtractor: useCallback(
      (range: Range) => {
        const indexes = defaultRangeExtractor(range);

        if (activeIndex !== -1 && !indexes.includes(activeIndex)) {
          return [...indexes, activeIndex].sort((a, b) => a - b);
        }

        return indexes;
      },
      [activeIndex]
    ),
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({active}) => {
        setActiveId(active.id);
      }}
      onDragEnd={({over}) => {
        if (over) {
          const overIndex = getIndex(over.id);
          if (activeIndex !== overIndex) {
            setItems((items) => arrayMove(items, activeIndex, overIndex));
          }
        }

        setActiveId(null);
      }}
      onDragCancel={() => setActiveId(null)}
      modifiers={modifiers}
    >
      <Wrapper center>
        <SortableContext items={items} strategy={strategy}>
          <div
            ref={scrollElementRef}
            className={styles.VirtualList}
            style={{width: 500, height: 600, overflow: 'auto'}}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: virtualizer.getTotalSize(),
              }}
            >
              {virtualizer.getVirtualItems().map(({index, start, size}) => {
                const id = items[index];

                return (
                  <SortableItem
                    key={id}
                    id={id}
                    index={index}
                    handle={handle}
                    wrapperStyle={() => ({
                      position: 'absolute',
                      top: start,
                      left: 0,
                      width: '100%',
                      height: size,
                      padding: 5,
                    })}
                    style={getItemStyles}
                    useDragOverlay
                  />
                );
              })}
            </div>
          </div>
        </SortableContext>
      </Wrapper>
      {createPortal(
        <DragOverlay adjustScale={adjustScale}>
          {activeId ? (
            <Item
              value={items[activeIndex]}
              handle={handle}
              style={getItemStyles({
                id: activeId,
                index: activeIndex,
                isDragging: true,
                isSorting: true,
                overIndex: -1,
                isDragOverlay: true,
              })}
              wrapperStyle={{
                padding: 5,
              }}
              dragOverlay
            />
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}

const props = {
  strategy: verticalListSortingStrategy,
};

export const BasicSetup = () => <Sortable {...props} />;
