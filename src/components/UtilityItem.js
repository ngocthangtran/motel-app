import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HelperText, useTheme } from 'react-native-paper';

function UtilityItem({ name, label = '', active, onPress }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <MaterialCommunityIcons
        name={name}
        color={active ? colors.primary : colors.disabled}
        size={24}
      />
      <HelperText>{label}</HelperText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '33%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
});

export default React.memo(UtilityItem);
