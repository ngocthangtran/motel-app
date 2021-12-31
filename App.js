import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { RootNavigator } from './src/navigators';
import { store } from './src/store/store';
import { darkTheme, defaultTheme } from './src/config/appTheme';
import {
  useFonts,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { restoreUser } from './src/store/slices/authSlice';

export default function App() {
  const [fontLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });
  const [theme, setTheme] = useState(false);
  const [userRestored, setUserRestored] = useState(false);

  useEffect(() => {
    store.dispatch(restoreUser());
    store.subscribe(() => {
      const { theme } = store.getState();
      setTheme(theme);
    });
    const unsubscribe = store.subscribe(() => {
      const { auth } = store.getState();
      setUserRestored(auth.restored);
      if (auth.restored) unsubscribe();
    });
  }, []);

  if (!fontLoaded || !userRestored) return <AppLoading />;
  return (
    <PaperProvider theme={theme ? darkTheme : defaultTheme}>
      <ReduxProvider store={store}>
        <NavigationContainer theme={theme ? darkTheme : defaultTheme}>
          <RootNavigator />
        </NavigationContainer>
      </ReduxProvider>
    </PaperProvider>
  );
}
