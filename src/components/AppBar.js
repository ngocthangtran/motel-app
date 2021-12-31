import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

function AppBar({ title, onBack }) {
  const { colors } = useTheme();
  return (
    <Appbar.Header style={{ height: 40, backgroundColor: colors.surface }}>
      <Appbar.BackAction onPress={onBack} />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(AppBar);
