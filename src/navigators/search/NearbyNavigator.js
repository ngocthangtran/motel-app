import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NEARBY_LIST_SCREEN, NEARBY_MAP_SCREEN } from '../../constants/navigation';
import { NearbyListScreen, NearbyMapScreen } from '../../screens/search';
import { AppBar } from '../../components';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { getNearbyPost } from '../../store/slices/nearbySlice';
import NearbyContext from '../../context/NearbyContext';

const Tab = createMaterialTopTabNavigator();

const NearbyNavigator = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12.27399587775837,
    longitude: 108.01448936814607,
  });
  const [radius, setRadius] = useState(2);

  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      setTimeout(() => {
        handleGetCurrentLocation();
      }, 1000);
    })();
  }, []);

  const handleGetCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Quyền truy cập', 'Vui lòng cho phép sử dụng vị trí để sử dụng tính năng này', [
        { text: 'Hủy' },
        { text: 'Mở cài đặt', onPress: Linking.openSettings },
      ]);
      return;
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({});
    setCurrentLocation({ latitude, longitude });
    dispatch(getNearbyPost({ lat: latitude, lng: longitude, radius }));
  };

  return (
    <NearbyContext.Provider value={{ currentLocation, radius }}>
      <AppBar title='Tìm xung quanh' />
      <Tab.Navigator>
        <Tab.Screen
          name={NEARBY_MAP_SCREEN}
          component={NearbyMapScreen}
          options={{ title: 'Bản đồ' }}
        />
        <Tab.Screen
          name={NEARBY_LIST_SCREEN}
          component={NearbyListScreen}
          options={{ title: 'Danh sách' }}
        />
      </Tab.Navigator>
    </NearbyContext.Provider>
  );
};

export default NearbyNavigator;
