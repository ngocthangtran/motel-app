import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

function FormGroup(props) {
  return <Surface style={styles.container}>{props.children}</Surface>;
}

const styles = StyleSheet.create({
  container: {
    margin: 2,
    marginBottom: 6,
    padding: 10,
    borderRadius: 6,
    elevation: 2,
  },
});

export default React.memo(FormGroup);
