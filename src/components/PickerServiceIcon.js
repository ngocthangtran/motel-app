import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';

function PickerServiceIcon({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons name={item} size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '33%',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default React.memo(PickerServiceIcon);
