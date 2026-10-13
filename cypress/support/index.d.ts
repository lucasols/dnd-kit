/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Visit a Storybook story
     */
    visitStory(id: string): Chainable<AUTWindow>;

    /**
     * Find the first draggable item in the document.
     */
    findFirstDraggableItem(): Chainable<JQuery<HTMLElement>>;

    /**
     * Find a draggable handle within an item.
     */
    findDraggableHandle(): Chainable<JQuery<HTMLElement>>;

    /**
     * Move a draggable element by the specified number of pixels.
     */
    mouseMoveBy(
      x: number,
      y: number,
      options?: {delay: number}
    ): Chainable<
      [
        Element,
        {
          initialRect: ClientRect;
          finalRect: ClientRect;
          delta: {x: number; y: number};
        },
      ]
    >;

    /**
     * Move a sortable element in a given direction
     */
    keyboardMoveBy(amount: number, direction: string): Chainable<Element>;

    /**
     * Find a draggable element node by id
     */
    findItemById(id: string): Chainable<JQuery<HTMLElement>>;

    /**
     * Get the index for a given sortable element
     */
    getIndexForItem(id: string): Chainable<number>;
  }
}
