import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LISTINGS, VIEW_MORE } from '../../constants/navigation';
import { ListingsScreen, ViewMoreScreen } from '../../screens/search';

const Stack = createStackNavigator();

export default React.memo(() => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={LISTINGS} component={ListingsScreen} />
      <Stack.Screen name={VIEW_MORE} component={ViewMoreScreen} />
    </Stack.Navigator>
  );
});
