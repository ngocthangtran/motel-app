import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, Text, FlatList } from 'react-native';
import { List, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from '../../components';
import { FAB } from '../../components/common';
import { CONTRACT, TENANT_EDIT } from '../../constants/navigation';
import { getTenants } from '../../store/slices/tenantSlice';

function TenantScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleCreatePress = () => navigation.navigate(TENANT_EDIT);
  const { tenants, loading } = useSelector(state => state.tenant);

  useEffect(() => {
    dispatch(getTenants());
  }, []);

  return (
    <View style={styles.container}>
      <AppBar title='Người thuê' />
      <Surface style={styles.contentContainer}>
        <FlatList
          data={tenants}
          keyExtractor={item => item.renterId}
          renderItem={({ item }) => {
            return (
              <List.Item
                title={item.name}
                description={item.phone}
                left={props => <List.Icon {...props} icon='account' />}
              />
            );
          }}
        />
      </Surface>
      <FAB onPress={handleCreatePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

export default React.memo(TenantScreen);
