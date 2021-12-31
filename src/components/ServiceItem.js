import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaskedText } from 'react-native-mask-text';
import { useTheme } from 'react-native-paper';

function ServiceItem({ icon, name, unit, price = 0, onPress }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={24} />
      <Text style={styles.name}>{name}</Text>
      {+price === 0 ? (
        <Text style={[styles.price, { color: colors.primary }]}>Miễn phí</Text>
      ) : (
        <MaskedText
          style={[styles.price, { color: colors.primary }]}
          type='currency'
          options={{
            suffix: 'đ /' + unit,
            decimalSeparator: '.',
            groupSeparator: '.',
            precision: 3,
          }}
        >
          {price}
        </MaskedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '30%',
    alignItems: 'center',
    elevation: 2,
    flexShrink: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 12,
    marginBottom: 12,
  },
  name: {
    marginVertical: 12,
  },
  price: {
    fontSize: 12,
  },
});

export default React.memo(ServiceItem);
