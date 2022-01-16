import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { AppBar } from '../../components';
import {
  ACTIVE_SERVICE_ROOMS_SCREEN,
  CLOSED_SERVICE_ROOMS_SCREEN,
} from '../../constants/navigation';
import ActiveServiceRoomsScreen from '../../screens/manage/ActiveServiceRoomsScreen';
import ClosedServiceRoomsScreen from '../../screens/manage/ClosedServiceRoomsScreen';

const Tab = createMaterialTopTabNavigator();

const ServiceClosingNavigator = () => {
  const navigation = useNavigation();

  const handleBack = () => navigation.goBack();
  return (
    <>
      <AppBar title='Chốt dịch vụ' onBack={handleBack} />
      <Tab.Navigator>
        <Tab.Screen
          name={ACTIVE_SERVICE_ROOMS_SCREEN}
          component={ActiveServiceRoomsScreen}
          options={{ title: 'Chưa chốt' }}
        />
        <Tab.Screen
          name={CLOSED_SERVICE_ROOMS_SCREEN}
          component={ClosedServiceRoomsScreen}
          options={{ title: 'Đã chốt' }}
        />
      </Tab.Navigator>
    </>
  );
};

export default React.memo(ServiceClosingNavigator);
