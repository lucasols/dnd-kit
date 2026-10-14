import {useState} from 'react';
import {
  getWindow,
  useIsomorphicLayoutEffect,
} from '@lucasols/dnd-kit-utilities';

import type {ClientRect} from '../../types';
import {Rect, getClientRect, getWindowClientRect} from '../../utilities/rect';
import {isDocumentScrollingElement} from '../../utilities';

import {useResizeObserver} from './useResizeObserver';
import {useWindowRect} from './useWindowRect';

const defaultValue: {rect: ClientRect; element: Element}[] = [];

export function useRects(
  elements: Element[],
  measure: (element: Element) => ClientRect = getClientRect
): {rect: ClientRect; element: Element}[] {
  const [firstElement] = elements;
  const windowRect = useWindowRect(
    firstElement ? getWindow(firstElement) : null
  );
  const [rects, setRects] = useState(defaultValue);

  function measureRects() {
    setRects(() => {
      if (!elements.length) {
        return defaultValue;
      }

      return elements.map((element) =>
        isDocumentScrollingElement(element)
          ? {
              rect: windowRect ?? getWindowClientRect(getWindow(element)),
              element,
            }
          : {rect: new Rect(measure(element), element), element}
      );
    });
  }

  const resizeObserver = useResizeObserver({callback: measureRects});

  useIsomorphicLayoutEffect(() => {
    resizeObserver?.disconnect();
    measureRects();
    elements.forEach((element) => resizeObserver?.observe(element));
  }, [elements]);

  return rects;
}
