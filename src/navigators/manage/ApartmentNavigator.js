import React, { createContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ApartmentInfoScreen, ApartmentRoomsScreen } from '../../screens/manage';
import { AppBar } from '../../components';
import { useRoute } from '@react-navigation/native';
import ApartmentContext from '../../context/ApartmentContext';

const Tab = createMaterialTopTabNavigator();

const ApartmentNavigator = () => {
  const route = useRoute();

  return (
    <ApartmentContext.Provider value={route.params}>
      <AppBar title={route.params?.name} />
      <Tab.Navigator>
        <Tab.Screen
          name='ApartmentRooms'
          component={ApartmentRoomsScreen}
          options={{ title: 'Phòng' }}
        />
        <Tab.Screen
          name='ApartmentInfo'
          component={ApartmentInfoScreen}
          options={{ title: 'Chi tiết căn hộ' }}
        />
      </Tab.Navigator>
    </ApartmentContext.Provider>
  );
};

export default React.memo(ApartmentNavigator);
