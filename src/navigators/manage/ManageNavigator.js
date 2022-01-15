import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  APARTMENT_EDIT_SCREEN,
  CONTRACTS,
  CONTRACT_EDIT_SCREEN,
  MAIN,
  ROOM_EDIT_SCREEN,
  ROOM_TENANTS_SCREEN,
  SERVICES,
  SERVICE_EDIT_SCREEN,
  TENANT,
  TENANT_EDIT,
} from '../../constants/navigation';
import {
  ApartmentEditScreen,
  ContractEditScreen,
  RoomEditScreen,
  RoomTenantsScreen,
  ServicesScreen,
  TenantEditScreen,
  TenantsScreen,
} from '../../screens/manage';
import ServiceEditScreen from '../../screens/manage/ServiceEditScreen';
import { MainScreen } from '../../screens/search';
import HomeNavigator from './HomeNavigator';
import ApartmentNavigator from './ApartmentNavigator';
import ContractNavigator from './ContractNavigator';

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
      <Stack.Screen name={TENANT} component={TenantsScreen} />
      <Stack.Screen name={TENANT_EDIT} component={TenantEditScreen} />
      <Stack.Screen name={CONTRACTS} component={ContractNavigator} />
      <Stack.Screen name={ROOM_TENANTS_SCREEN} component={RoomTenantsScreen} />
      <Stack.Screen name={CONTRACT_EDIT_SCREEN} component={ContractEditScreen} />
    </Stack.Navigator>
  );
});
