import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text, FlatList } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { List, Searchbar, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from '../../components';
import { FAB, SwipeableAction } from '../../components/common';
import { CONTRACT, TENANT_EDIT } from '../../constants/navigation';
import { deleteTenant, getTenants, uploadTenant } from '../../store/slices/tenantSlice';

function TenantScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleCreatePress = () => navigation.navigate(TENANT_EDIT);
  const { tenants: renters, loading } = useSelector(state => state.tenant);
  const [tenants, setTenats] = useState([]);

  useEffect(() => {
    dispatch(getTenants());
  }, []);
  useEffect(() => {
    setTenats(renters);
  }, [renters]);

  const handleDeleteTenant =
    ({ renterId }) =>
    () => {
      dispatch(deleteTenant(renterId))
        .unwrap()
        .then(() => {
          const index = renters.findIndex(el => el.renterId === renterId);
          if (index === -1) return alert('Có gì đó sai sai');
          dispatch(
            uploadTenant({
              type: 'remove',
              index,
            })
          );
        })
        .catch(e => {
          alert('error');
        });
    };
  const onChangeText = text => {
    const data = [];
    renters.forEach(element => {
      const result = element.name.toLowerCase().search(text.toLowerCase());
      if (result !== -1) {
        data.push(element);
      }
    });
    setTenats(data);
  };
  return (
    <View style={styles.container}>
      <AppBar title='Người thuê' />
      <Surface style={styles.contentContainer}>
        <Searchbar
          placeholder='Tìm người thuê'
          style={styles.searchBar}
          onChangeText={onChangeText}
        />
        <FlatList
          data={tenants}
          keyExtractor={item => item.renterId}
          renderItem={({ item }) => {
            return (
              <Swipeable
                renderLeftActions={() => {
                  return (
                    <SwipeableAction
                      background='red'
                      icon='trash-can-outline'
                      onPress={handleDeleteTenant(item)}
                    />
                  );
                }}
              >
                <List.Item
                  title={item.name}
                  description={item.phone}
                  left={props => <List.Icon {...props} icon='account' />}
                />
              </Swipeable>
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
  searchBar: {
    marginTop: 6,
    marginBottom: 24,
    elevation: 1,
  },
});

export default React.memo(TenantScreen);
