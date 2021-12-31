import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Surface, IconButton, Text } from 'react-native-paper';
import MapView, { Circle, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/core';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { getNearbyPost } from '../../store/slices/nearbySlice';
import { POST_DETAILS } from '../../constants/navigation';
import { vndFormatter } from '../../utils/common';

function NearbyScreen(props) {
  const navigation = useNavigation();
  const handleBack = () => navigation.goBack();
  const mapRef = useRef();
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12.27399587775837,
    longitude: 108.01448936814607,
  });
  const [radius, setRadius] = useState(2);
  const { posts, loading, error } = useSelector(state => state.nearby);
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      setTimeout(() => {
        handleGetCurrentLocation();
      }, 1000);
    })();
  }, []);

  // const handleUserLocationChange = ({ nativeEvent }) => {
  //   console.log('update');
  //   const { latitude, longitude } = nativeEvent.coordinate;
  //   setCurrentLocation({ latitude, longitude });
  //   mapRef.current.animateToRegion({
  //     latitude: latitude,
  //     longitude: longitude,
  //     latitudeDelta: 0,
  //     longitudeDelta: 0,
  //   });
  //   dispatch(getNearbyPost({ lat: latitude, lng: longitude, radius }));
  // };

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
    mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0,
      longitudeDelta: 0,
    });
  };

  const handleMotelPress = motel => () => {
    navigation.navigate(POST_DETAILS, { postId: motel.postId });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ height: 40, backgroundColor: '#fff' }}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title='Tìm kiếm xung quanh' />
      </Appbar.Header>
      <Surface style={styles.body}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: 12.27399587775837,
            longitude: 108.01448936814607,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsMyLocationButton={true}
          showsPointsOfInterest={true}
          showsCompass={true}
          // showsUserLocation
          // onUserLocationChange={handleUserLocationChange}
        >
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
          />
          <Circle
            center={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
            radius={radius * 1000}
            fillColor={'rgba(247,126,29, .2)'}
          />
          {posts.map(item => {
            return (
              <Marker
                pinColor='#f0f'
                key={item.postId}
                coordinate={{
                  latitude: +item.latitude,
                  longitude: +item.longitude,
                }}
                onPress={handleMotelPress(item)}
              >
                <>
                  <IconButton
                    icon='home'
                    size={33}
                    color={item.postType !== 'FOR_RENT' ? 'dodgerblue' : 'coral'}
                  />
                  <Text style={{ fontSize: 8, textAlign: 'center', marginTop: -18, color: 'grey' }}>
                    {vndFormatter(item.price)}
                  </Text>
                </>
              </Marker>
            );
          })}
        </MapView>
        <Text style={styles.count}>Tìm thấy ({posts.length}) địa điểm</Text>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: {
    flex: 1,
  },
  count: {
    textAlign: 'center',
    marginTop: 18,
    fontWeight: 'bold',
    color: 'dodgerblue',
  },
});

export default React.memo(NearbyScreen);
