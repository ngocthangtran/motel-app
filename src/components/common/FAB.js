import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB as FAB_P } from 'react-native-paper';

function FAB({ icon = 'plus', onPress }) {
  return <FAB_P icon={icon} onPress={onPress} style={styles.fab} />;
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default React.memo(FAB);
