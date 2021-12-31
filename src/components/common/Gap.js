import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';

function Gap({ height = 10, width = 10, color = 'transparent' }) {
  return <Surface style={{ width, height, backgroundColor: color }}></Surface>;
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(Gap);
