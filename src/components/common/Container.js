import React from 'react';
import { Surface } from 'react-native-paper';

function Container({ style, horizontal = false, children }) {
  return (
    <Surface
      style={[
        horizontal && { flexDirection: 'row', alignItems: 'center' },
        style,
      ]}
    >
      {children}
    </Surface>
  );
}
export default React.memo(Container);
