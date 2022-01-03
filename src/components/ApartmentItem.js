import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Pressable from './Pressable';

function ApartmentItem({ name = '', address = '', onPress, onDelete, onEdit }) {
  const { colors } = useTheme();
  return (
    // <TouchableWithoutFeedback onPress={onPress}>
    <Pressable
      onPress={onPress}
      actionsHorizontal
      style={[styles.container, { backgroundColor: colors.surface }]}
      longPressActions={[
        { icon: 'trash-can-outline', onPress: onDelete, color: 'tomato' },
        { icon: 'circle-edit-outline', onPress: onEdit },
      ]}
    >
      <MaterialCommunityIcons name='home-city-outline' size={80} color='#7f7f7f' />
      <Text style={{ color: colors.primary, marginVertical: 12, fontWeight: 'bold' }}>{name}</Text>
      <Text style={styles.address} numberOfLines={3}>
        {address + '\n\n\n'}
      </Text>
    </Pressable>
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    width: '48%',
    marginVertical: 12,
    marginHorizontal: 2,
    alignItems: 'center',
    borderRadius: 6,
    padding: 12,
    elevation: 1,
  },
  address: {
    fontSize: 12,
  },
});

export default React.memo(ApartmentItem);
