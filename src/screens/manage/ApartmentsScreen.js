import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { FAB, Searchbar, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ApartmentItem, AppBar } from '../../components';
import { AfterInteractions } from '../../components/common';
import { APARTMENT_EDIT_SCREEN } from '../../constants/navigation';
import { getApartment } from '../../store/slices/apartment';

function ApartmentScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { apartments: building, loading, error } = useSelector(state => state.apartment.get);
  const [apartments, setAparments] = useState(building)

  useEffect(() => {
    dispatch(getApartment());
  }, []);

  const handleFabPress = () => navigation.navigate(APARTMENT_EDIT_SCREEN);

  const handleApartmentPress = a => () => {
    navigation.navigate('APARTMENT', a);
  };

  const onChangeText = (text) => {
    const data = [];
    building.forEach(element => {
      const result = element.name.search(text)
      if (result !== -1) {
        data.push(element)
      }
    });
    setAparments(data)
  }
  return (
    <Surface style={styles.container}>
      <AppBar title='Tòa nhà' />
      <Surface style={styles.contentContainer}>
        <AfterInteractions>
          <Searchbar placeholder='Tìm tòa nhà' style={styles.searchBar} onChangeText={onChangeText}  />
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
