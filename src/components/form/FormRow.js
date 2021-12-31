import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

function FormRow({ children, ...containerStyle }) {
  return <Surface style={[styles.container, containerStyle]}>{children}</Surface>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default React.memo(FormRow);
