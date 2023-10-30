import type {Modifier} from '@lucasols/dnd-kit-core';

export const restrictToHorizontalAxis: Modifier = ({transform}) => {
  return {
    ...transform,
    y: 0,
  };
};
