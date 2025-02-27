import React, {CSSProperties} from 'react';
import type {UniqueIdentifier} from '@lucasols/dnd-kit-core';
import {AnimateLayoutChanges, useSortable} from '@lucasols/dnd-kit-sortable';
import {CSS} from '@lucasols/dnd-kit-utilities';

import {TreeItem, Props as TreeItemProps} from './TreeItem';
import {iOS} from '../../utilities';

interface Props extends TreeItemProps {
  id: UniqueIdentifier;
}

const animateLayoutChanges: AnimateLayoutChanges = ({isSorting, wasDragging}) =>
  isSorting || wasDragging ? false : true;

export function SortableTreeItem({id, depth, ...props}: Props) {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
  });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <TreeItem
      ref={setDraggableNodeRef}
      wrapperRef={setDroppableNodeRef}
      style={style}
      depth={depth}
      ghost={isDragging}
      disableSelection={iOS}
      disableInteraction={isSorting}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      {...props}
    />
  );
}
