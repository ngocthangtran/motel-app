import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppBar } from '../../components';

function ContractScreen(props) {
  return (
    <View style={styles.container}>
      <AppBar title='Hợp đồng' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(ContractScreen);
