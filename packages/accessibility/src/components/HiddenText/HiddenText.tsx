import React from 'react';

interface Props {
  id: string;
  value: string;
}

const hiddenStyles: React.CSSProperties = {
  display: 'none',
};

export function HiddenText({id, value}: Props): React.JSX.Element {
  return (
    <div id={id} style={hiddenStyles}>
      {value}
    </div>
  );
}
