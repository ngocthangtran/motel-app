import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Sub, Subheading, Surface } from 'react-native-paper';

function SectionWrapper({ title, children }) {
  return (
    <Surface style={styles.container}>
      <Subheading style={styles.title}>{title}</Subheading>
      <>{children}</>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 24,
  },
});

export default React.memo(SectionWrapper);
