import type {Modifier} from '@lucasols/dnd-kit-core';

import {restrictToBoundingRect} from './utilities';

export const restrictToWindowEdges: Modifier = ({
  transform,
  draggingNodeRect,
  windowRect,
}) => {
  if (!draggingNodeRect || !windowRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, draggingNodeRect, windowRect);
};
