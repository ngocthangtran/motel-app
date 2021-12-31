import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  APARTMENT_EDIT_SCREEN,
  MAIN,
  ROOM_EDIT_SCREEN,
  SERVICES,
  SERVICE_EDIT_SCREEN,
} from '../../constants/navigation';
import { ApartmentEditScreen, RoomEditScreen, ServicesScreen } from '../../screens/manage';
import ServiceEditScreen from '../../screens/manage/ServiceEditScreen';
import { MainScreen } from '../../screens/search';
import HomeNavigator from './HomeNavigator';
import ApartmentNavigator from './ApartmentNavigator';

const Stack = createStackNavigator();

export default React.memo(() => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'asdf'} component={HomeNavigator} />
      <Stack.Screen name={MAIN} component={MainScreen} />
      <Stack.Screen name={APARTMENT_EDIT_SCREEN} component={ApartmentEditScreen} />
      <Stack.Screen name={SERVICES} component={ServicesScreen} />
      <Stack.Screen name={SERVICE_EDIT_SCREEN} component={ServiceEditScreen} />
      <Stack.Screen name={'APARTMENT'} component={ApartmentNavigator} />
      <Stack.Screen name={ROOM_EDIT_SCREEN} component={RoomEditScreen} />
    </Stack.Navigator>
  );
});
