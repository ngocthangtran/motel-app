import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ACCOUNT, APARTMENTS, MANAGE_HOME, UTIL } from '../../constants/navigation';
import { ApartmentsScreen, MangeHomeScreen, UtilsScreen } from '../../screens/manage';
import AccountScreen from '../../screens/AccountScreen';

const Tab = createBottomTabNavigator();

export default React.memo(() => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}>
      <Tab.Screen
        name={MANAGE_HOME}
        component={MangeHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' size={size} color={color} />
          ),
          title: 'Trang chính',
        }}
      />
      <Tab.Screen
        name={APARTMENTS}
        component={ApartmentsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='apps' size={size} color={color} />
          ),
          title: 'Căn hộ',
        }}
      />
      <Tab.Screen
        name={UTIL}
        component={UtilsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='calculator' size={size} color={color} />
          ),
          title: 'Máy tính',
        }}
      />
      <Tab.Screen
        name={ACCOUNT}
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='account' size={size} color={color} />
          ),
          title: 'Tài khoản',
        }}
      />
    </Tab.Navigator>
  );
});
