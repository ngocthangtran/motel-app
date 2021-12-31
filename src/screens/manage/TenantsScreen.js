import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppBar } from '../../components';

function TenantScreen(props) {
  return (
    <View style={styles.container}>
      <AppBar title='Người thuê' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(TenantScreen);
