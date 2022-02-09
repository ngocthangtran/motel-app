import React, { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Alert, Linking, StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import FormFieldWrapper from './FormFieldWrapper';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

function FormLocationPicker({ name, label, placeholder, defaultValue, numeric = false, ...rest }) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const mapRef = useRef();

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
    setValue(name, { latitude, longitude });
    mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0,
      longitudeDelta: 0,
    });
  };

  const handlePress = location => {
    const {
      nativeEvent: {
        coordinate: { latitude, longitude },
      },
    } = location;
    setValue(name, { latitude, longitude });
    mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0,
      longitudeDelta: 0,
    });
  };

  return (
    <FormFieldWrapper label={label} error={errors[name]?.message}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || { latitude: 0, longitude: 0 }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.map}>
            <MapView
              ref={mapRef}
              style={StyleSheet.absoluteFillObject}
              initialRegion={{
                latitude: defaultValue.latitude || 0,
                longitude: defaultValue.longitude || 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
              }}
              onPress={handlePress}
            >
              <Marker
                coordinate={{
                  latitude: value.latitude,
                  longitude: value.longitude,
                }}
              />
            </MapView>
            <IconButton
              icon='image-filter-center-focus-weak'
              style={styles.getLocationButton}
              size={25}
              color='#009688'
              onPress={handleGetCurrentLocation}
            />
          </View>
        )}
      />
    </FormFieldWrapper>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 220,
    borderRadius: 6,
  },
  getLocationButton: {
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
});

export default React.memo(FormLocationPicker);
