import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  APARTMENT_EDIT_SCREEN,
  BILLING,
  BILL_EDIT_SCREEN,
  CONTRACTS,
  CONTRACT_DETAILS_SCREEN,
  CONTRACT_EDIT_SCREEN,
  MAIN,
  ROOM_EDIT_SCREEN,
  ROOM_TENANTS_SCREEN,
  SERVICES,
  SERVICE_CLOSING,
  SERVICE_CLOSING_EDIT_SCREEN,
  SERVICE_EDIT_SCREEN,
  TENANT,
  TENANT_EDIT,
  BILL_DETAILS_SCREEN,
} from '../../constants/navigation';
import {
  ApartmentEditScreen,
  ContractDetailsScreen,
  ContractEditScreen,
  RoomEditScreen,
  RoomTenantsScreen,
  ServicesScreen,
  TenantEditScreen,
  TenantsScreen,
  BillDetailsScreen,
} from '../../screens/manage';
import ServiceEditScreen from '../../screens/manage/ServiceEditScreen';
import { MainScreen } from '../../screens/search';
import HomeNavigator from './HomeNavigator';
import ApartmentNavigator from './ApartmentNavigator';
import ContractNavigator from './ContractNavigator';
import ServiceClosingNavigator from './ServiceClosingNavigator';
import ServiceClosingEditScreen from '../../screens/manage/ServiceClosingEditScreen';
import BillingNavigator from './BillingNavigator';
import BillEditScreen from '../../screens/manage/BillEditScreen';
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
      <Stack.Screen name={SERVICE_CLOSING} component={ServiceClosingNavigator} />
      <Stack.Screen name={SERVICE_CLOSING_EDIT_SCREEN} component={ServiceClosingEditScreen} />
      <Stack.Screen name={CONTRACT_DETAILS_SCREEN} component={ContractDetailsScreen} />
      <Stack.Screen name={BILLING} component={BillingNavigator} />
      <Stack.Screen name={BILL_EDIT_SCREEN} component={BillEditScreen} />
      <Stack.Screen name={BILL_DETAILS_SCREEN} component={BillDetailsScreen} />
    </Stack.Navigator>
  );
});
