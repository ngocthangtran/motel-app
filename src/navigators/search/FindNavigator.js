import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  ACCOUNT,
  FIND_HOME,
  LIKED,
  LOGIN,
  NEARBY,
  POST_DETAILS,
  POST_EDIT,
  SEARCH,
  POSTED,
} from '../../constants/navigation';
import LoginScreen from '../../screens/LoginScreen';
import {
  AccountScreen,
  LikedScreen,
  NearbyScreen,
  PostDetailsScreen,
  PostEditScreen,
  PostedScreen,
  SearchScreen,
} from '../../screens/search';
import HomeNavigator from './HomeNavigator';

const Stack = createStackNavigator();

export default React.memo(() => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={FIND_HOME} component={HomeNavigator} />
      <Stack.Screen name={ACCOUNT} component={AccountScreen} />
      <Stack.Screen name={LIKED} component={LikedScreen} />
      <Stack.Screen name={SEARCH} component={SearchScreen} />
      <Stack.Screen name={LOGIN} component={LoginScreen} />
      <Stack.Screen name={POST_EDIT} component={PostEditScreen} />
      <Stack.Screen name={POST_DETAILS} component={PostDetailsScreen} />
      <Stack.Screen name={NEARBY} component={NearbyScreen} />
      <Stack.Screen name={POSTED} component={PostedScreen} />
    </Stack.Navigator>
  );
});
