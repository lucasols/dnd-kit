import {useIsomorphicLayoutEffect} from '@lucasols/dnd-kit-utilities';

import {scrollIntoViewIfNeeded} from '../../utilities/scroll';

export function useScrollIntoViewIfNeeded(
  element: HTMLElement | null | undefined
) {
  useIsomorphicLayoutEffect(() => {
    scrollIntoViewIfNeeded(element);
  }, [element]);
}
