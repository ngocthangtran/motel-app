import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  InteractionManager,
  ActivityIndicator,
} from 'react-native';

function AfterInteractions({
  PlaceHolderComponent = <ActivityIndicator animating color={'#f0f'} />,
  children,
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setReady(true);
    });
  }, []);

  return (
    <View style={styles.container}>
      {!ready ? PlaceHolderComponent : children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
});

export default React.memo(AfterInteractions);
