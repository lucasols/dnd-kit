import type {UniqueIdentifier} from '@lucasols/dnd-kit-core';

export type SortableData = {
  sortable: {
    containerId: UniqueIdentifier;
    items: UniqueIdentifier[];
    index: number;
  };
};
