import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Alert, FlatList } from 'react-native';
import { HelperText, List, Surface, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from '../../components';
import { FAB } from '../../components/common';
import { CONTRACT, CONTRACT_EDIT_SCREEN } from '../../constants/navigation';
import { getRoomTenants } from '../../store/slices/roomSlice';

function RoomTenantsScreen(props) {
  const { room, apartmentId } = useRoute().params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, tenants, error } = useSelector(state => state.room);

  useEffect(() => {
    dispatch(getRoomTenants(room.roomId));
  }, []);

  const handleCreateContract = () =>
    navigation.navigate(CONTRACT_EDIT_SCREEN, { room, apartmentId });
  const handleFabPress = () => {
    if (room.contractCount === 0) {
      Alert.alert('Chưa có hợp đòng', 'Phòng chưa có hợp đồng, tạo hợp đồng ngay?', [
        { text: 'Hủy' },
        { text: 'Tạo hợp đồng', onPress: handleCreateContract },
      ]);
    }
  };
  const handleBack = () => navigation.goBack();
  return (
    <View style={styles.container}>
      <AppBar title='Người thuê' onBack={handleBack} />
      <Surface style={styles.contentContainer}>
        {tenants.length === 0 && <Title style={{ textAlign: 'center' }}>Phòng trống</Title>}
        <FlatList
          data={tenants}
          keyExtractor={t => t.renterId}
          renderItem={({ item }) => {
            return (
              <List.Item
                title={item.name}
                description={'CMND: ' + item.numberCard}
                left={props => <List.Icon {...props} icon='account-outline' />}
              />
            );
          }}
        />
      </Surface>
      <FAB onPress={handleFabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
});

export default React.memo(RoomTenantsScreen);
