import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Subheading, Surface, useTheme } from 'react-native-paper';

function DashboardItem({ icon = '', title = '', onPress }) {
  const { colors } = useTheme();
  return (
    <Surface style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons name={icon} size={30} color={colors.primary} />
        <Subheading numberOfLines={2} style={{ color: colors.text }}>
          {title}
        </Subheading>
      </TouchableOpacity>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '30%',
    height: 100,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: 12,
    marginVertical: 6,
    // backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 6,
  },
});

export default React.memo(DashboardItem);
