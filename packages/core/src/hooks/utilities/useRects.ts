import {useReducer} from 'react';
import {
  getWindow,
  useIsomorphicLayoutEffect,
} from '@lucasols/dnd-kit-utilities';

import type {ClientRect} from '../../types';
import {Rect, getClientRect} from '../../utilities/rect';
import {isDocumentScrollingElement} from '../../utilities';

import {useResizeObserver} from './useResizeObserver';
import {useWindowRect} from './useWindowRect';

const defaultValue: {rect: Rect; element: Element}[] = [];

export function useRects(
  elements: Element[],
  measure: (element: Element) => ClientRect = getClientRect
): {rect: ClientRect; element: Element}[] {
  const [firstElement] = elements;
  const windowRect = useWindowRect(
    firstElement ? getWindow(firstElement) : null
  );
  const [rects, measureRects] = useReducer(reducer, defaultValue);
  const resizeObserver = useResizeObserver({callback: measureRects});

  if (elements.length > 0 && rects === defaultValue) {
    measureRects();
  }

  useIsomorphicLayoutEffect(() => {
    if (elements.length) {
      elements.forEach((element) => resizeObserver?.observe(element));
    } else {
      resizeObserver?.disconnect();
      measureRects();
    }
  }, [elements]);

  return rects;

  function reducer() {
    if (!elements.length) {
      return defaultValue;
    }

    return elements.map((element) =>
      isDocumentScrollingElement(element)
        ? {rect: windowRect as ClientRect, element}
        : {rect: new Rect(measure(element), element), element}
    );
  }
}
