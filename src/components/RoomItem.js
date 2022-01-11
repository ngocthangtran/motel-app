import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { vndFormatter } from '../utils/common';

function RoomItem({ name = '', price = '', onPress }) {
  const { colors } = useTheme();
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onLongPress={() => {
        alert('ok');
      }}
    >
      <Surface style={styles.container}>
        <MaterialCommunityIcons name='microsoft-windows' size={80} color='#7f7f7f' />
        <Text style={{ color: colors.primary, marginVertical: 12, fontWeight: 'bold' }}>
          {name}
        </Text>
        <Text style={styles.address} numberOfLines={2}>
          {vndFormatter(price)}
        </Text>
      </Surface>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    width: '48%',
    marginVertical: 12,
    marginHorizontal: 2,
    alignItems: 'center',
    elevation: 2,
    borderRadius: 6,
    padding: 12,
  },
  address: {
    fontSize: 11,
    marginBottom: 12,
  },
});

export default React.memo(RoomItem);
