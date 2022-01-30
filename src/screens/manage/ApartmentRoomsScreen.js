import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RoomItem } from '../../components';
import { FAB } from '../../components/common';
import { ROOM_EDIT_SCREEN, ROOM_TENANTS_SCREEN, TENANT } from '../../constants/navigation';
import ApartmentContext from '../../context/ApartmentContext';
import { getRooms } from '../../store/slices/roomSlice';

function ApartmentRoomsScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error, rooms } = useSelector(state => state.room);
  const apartment = useContext(ApartmentContext);
  useEffect(() => {
    dispatch(getRooms(apartment.buildingId));
  }, []);

  const handleFabPress = () => navigation.navigate(ROOM_EDIT_SCREEN, apartment);
  const handleItemPress = room => () => {
    navigation.navigate(ROOM_TENANTS_SCREEN, { room, apartmentId: apartment.buildingId });
  };

  const handleDeleteRoom = room => {
    console.log(room)
  }

  const handleRefresh = () => dispatch(getRooms(apartment.buildingId));
  return (
    <View style={styles.container}>
      <FlatList
        refreshing={loading}
        onRefresh={handleRefresh}
        data={rooms}
        keyExtractor={item => item.roomId}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => {
          return <RoomItem
            name={item.name}
            price={item.price}
            onPress={handleItemPress(item)}
            onDelete={handleDeleteRoom(item)} />;
        }}
      />
      <FAB onPress={handleFabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 24,
  },
});

export default React.memo(ApartmentRoomsScreen);
