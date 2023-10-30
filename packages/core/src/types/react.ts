import type {Without} from '@lucasols/dnd-kit-utilities';

export type SyntheticEventName = keyof Without<
  React.DOMAttributes<any>,
  'children' | 'dangerouslySetInnerHTML'
>;
