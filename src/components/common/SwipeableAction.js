import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function SwipeableAction({ icon, background = 'dodgerblue', processing = false, onPress }) {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: background }]} onPress={onPress}>
      {processing ? (
        <ActivityIndicator animating color='#fff' />
      ) : (
        <MaterialCommunityIcons name={icon} size={20} color='#fff' />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(SwipeableAction);
