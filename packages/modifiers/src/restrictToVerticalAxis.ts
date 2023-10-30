import type {Modifier} from '@lucasols/dnd-kit-core';

export const restrictToVerticalAxis: Modifier = ({transform}) => {
  return {
    ...transform,
    x: 0,
  };
};
