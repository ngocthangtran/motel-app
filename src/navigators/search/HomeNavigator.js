import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ACCOUNT, FEED, LIKED, LISTINGS } from '../../constants/navigation';
import { AccountScreen, LikedScreen, ListingsScreen } from '../../screens/search';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FeedNavigator from './FeedNavigator';

const Tab = createBottomTabNavigator();

export default React.memo(() => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        lazy: true,
      }}
    >
      <Tab.Screen
        name={FEED}
        component={FeedNavigator}
        options={{
          title: 'Tin mới',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={LIKED}
        component={LikedScreen}
        options={{
          title: 'Đã thích',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='heart' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ACCOUNT}
        component={AccountScreen}
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='account' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
});
