import React, { useContext, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, IconButton, Text } from 'react-native-paper';
import MapView, { Circle, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { POST_DETAILS } from '../../constants/navigation';
import { vndFormatter } from '../../utils/common';
import NearbyContext from '../../context/NearbyContext';

function NearbyMapScreen(props) {
  const navigation = useNavigation();
  const handleBack = () => navigation.goBack();
  const mapRef = useRef();
  const { posts, loading, error } = useSelector(state => state.nearby);
  const dispatch = useDispatch();
  const { currentLocation, radius } = useContext(NearbyContext);

  const handleMotelPress = motel => () => {
    navigation.navigate(POST_DETAILS, { postId: motel.postId });
  };

  useEffect(() => {
    mapRef.current.animateToRegion({
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0,
    });
  }, [currentLocation]);

  return (
    <View style={styles.container}>
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

export default React.memo(NearbyMapScreen);
