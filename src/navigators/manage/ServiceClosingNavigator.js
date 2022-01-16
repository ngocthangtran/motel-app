import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from '../../components';
import {
  ACTIVE_SERVICE_ROOMS_SCREEN,
  CLOSED_SERVICE_ROOMS_SCREEN,
} from '../../constants/navigation';
import ServiceClosingContext from '../../context/ServiceClosingContext';
import ActiveServiceRoomsScreen from '../../screens/manage/ActiveServiceRoomsScreen';
import ClosedServiceRoomsScreen from '../../screens/manage/ClosedServiceRoomsScreen';
import { getServiceClosingRooms } from '../../store/slices/serviceClosingSlice';

const Tab = createMaterialTopTabNavigator();

const ServiceClosingNavigator = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const serviceClosingState = useSelector(state => state.serviceClosing);

  useEffect(() => {
    dispatch(getServiceClosingRooms());
  }, []);

  const handleBack = () => navigation.goBack();

  return (
    <>
      <AppBar title='Chốt dịch vụ' onBack={handleBack} />
      <ServiceClosingContext.Provider value={{ ...serviceClosingState }}>
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
      </ServiceClosingContext.Provider>
    </>
  );
};

export default React.memo(ServiceClosingNavigator);
