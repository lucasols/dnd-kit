import type {ClientRect, Coordinates} from '../../types';
import {getRectDelta} from '../../utilities';

import {useInitialValue} from './useInitialValue';

export function useRectDelta(rect: ClientRect | null): Coordinates {
  const initialRect = useInitialValue(rect);

  return getRectDelta(rect, initialRect);
}
