import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Pressable } from 'react-native';
import { FAB, Searchbar, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ApartmentItem, AppBar, LongPress } from '../../components';
import { AfterInteractions } from '../../components/common';
import { APARTMENT_EDIT_SCREEN } from '../../constants/navigation';
import { getApartment } from '../../store/slices/apartment';
import { deleteApartment } from '../../store/slices/apartment/delete';
import { reloadApartment } from '../../store/slices/apartment/get';

function ApartmentScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { apartments: building, loading, error } = useSelector(state => state.apartment.get);
  const [apartments, setApartments] = useState(building);

  useEffect(() => {
    dispatch(getApartment());
  }, []);

  useEffect(() => {
    setApartments(building);
  }, [building]);
  const handleFabPress = () => navigation.navigate(APARTMENT_EDIT_SCREEN);

  const handleApartmentPress = a => () => {
    navigation.navigate('APARTMENT', a);
  };

  const onChangeText = text => {
    const data = [];
    building.forEach(element => {
      const result = element.name.search(text);
      if (result !== -1) {
        data.push(element);
      }
    });
    setApartments(data);
  };

  const handleDelete = item => () => {

    const index = building.findIndex(el => el.buildingId === item.buildingId)
    if (index === -1) {
      return alert("Có lỗi xảy ra không tìm thấy tòa nhà này")
    }
    const deleteApartmentAction = deleteApartment({ buildingId: item.buildingId })
    try {
      dispatch(deleteApartmentAction).unwrap()
        .then(res => {
          console.log(res);
          alert(`Đã xóa tòa nhà: ${item.name}`)
          dispatch(reloadApartment({
            type: "remove", index
          }))
        }
        ).catch(err => {
          alert(`Lỗi xóa tòa nhà: ${item.name}`)
        })
    } catch (error) {
      console.log(err)
    }

  };

  const handleEdit = a => () => {
    alert('edit ' + a.name);
  };

  return (
    <Surface style={styles.container}>
      <AppBar title='Tòa nhà' />
      <Surface style={styles.contentContainer}>
        <AfterInteractions>
          <Searchbar
            placeholder='Tìm tòa nhà'
            style={styles.searchBar}
            onChangeText={onChangeText}
          />
          <FlatList
            refreshing={loading}
            numColumns={2}
            data={apartments}
            keyExtractor={item => item.buildingId}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => {
              return (
                <ApartmentItem
                  name={item.name}
                  address={item.address}
                  onPress={handleApartmentPress(item)}
                  onDelete={handleDelete(item)}
                  onEdit={handleEdit(item)}
                />
              );
            }}
          />
        </AfterInteractions>
      </Surface>
      <FAB icon='plus' style={styles.fab} onPress={handleFabPress} />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  searchBar: {
    marginTop: 6,
    marginBottom: 24,
    elevation: 1,
  },
});

export default React.memo(ApartmentScreen);
