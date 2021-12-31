import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function SectionListHeader({ title }) {
  return (
    <Surface style={styles.container}>
      <MaterialCommunityIcons name='asterisk' size={20} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    padding: 10,
  },
  icon: {
    marginRight: 12,
    color: 'coral',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default React.memo(SectionListHeader);
