import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
