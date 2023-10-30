import type {ClientRect} from '@lucasols/dnd-kit-core';
import type {Transform} from '@lucasols/dnd-kit-utilities';

export type SortingStrategy = (args: {
  activeNodeRect: ClientRect | null;
  activeIndex: number;
  index: number;
  rects: ClientRect[];
  overIndex: number;
}) => Transform | null;
