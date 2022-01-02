import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { AppBar } from '../../components';
import { FAB } from '../../components/common';
import { CONTRACT, TENANT_EDIT } from '../../constants/navigation';

function TenantScreen(props) {
  const navigation = useNavigation();
  const handleCreatePress = () => navigation.navigate(TENANT_EDIT);

  return (
    <View style={styles.container}>
      <AppBar title='Người thuê' />
      <FAB onPress={handleCreatePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(TenantScreen);
