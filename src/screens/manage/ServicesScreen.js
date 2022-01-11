import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { FAB, Searchbar, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, ServiceItem } from '../../components';
import { Gap, SectionWrapper } from '../../components/common';
import { SERVICE_EDIT_SCREEN } from '../../constants/navigation';
import { getServices } from '../../store/slices/serviceSlice';

function ServiceScreen(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector(state => state.service);

  useEffect(() => {
    fetchServices();
  }, []);

  const handleFabPress = () => navigation.navigate(SERVICE_EDIT_SCREEN);
  const handleServiceItemPress = item => () => navigation.navigate(SERVICE_EDIT_SCREEN, item);
  const fetchServices = () => dispatch(getServices());

  const handleBack = () => navigation.goBack();

  return (
    <Surface style={styles.container}>
      <AppBar title='Dịch vụ' onBack={handleBack} />
      <Surface style={styles.contentContainer}>
        <Searchbar placeholder='Tìm dịch vụ' style={styles.searchBar} />
        <SectionWrapper title='Dịch vụ có phí'>
          <FlatList
            data={services.filter(s => +s.price != 0)}
            numColumns={3}
            keyExtractor={s => s.serviceId}
            renderItem={({ item }) => (
              <ServiceItem
                icon={item.icon}
                name={item.name}
                unit={item.unit}
                price={item.price}
                onPress={handleServiceItemPress(item)}
              />
            )}
          />
        </SectionWrapper>
        <SectionWrapper title='Dịch vụ miễn phí'>
          <FlatList
            data={services.filter(s => +s.price === 0)}
            numColumns={3}
            keyExtractor={s => s.serviceId}
            ItemSeparatorComponent={Gap}
            renderItem={({ item }) => (
              <ServiceItem
                icon={item.icon}
                name={item.name}
                unit={item.unit}
                price={item.price}
                onPress={handleServiceItemPress(item)}
              />
            )}
          />
        </SectionWrapper>
        <Text>{JSON.stringify(error)}</Text>
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
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  searchBar: {
    marginTop: 6,
    marginBottom: 24,
    elevation: 1,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default React.memo(ServiceScreen);
