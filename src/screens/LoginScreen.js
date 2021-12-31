import React from 'react';
import * as Google from 'expo-google-app-auth';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Snackbar, Surface } from 'react-native-paper';
import { login } from '../store/slices/authSlice';
import { StyleSheet } from 'react-native';
import { SafeAreaContainer } from '../components/common';
import { useNavigation } from '@react-navigation/core';
import { googleLoginCfg } from '../config/googleConfig';
import useDisclosure from '../hooks/useDisclosure';

function LoginScreen(props) {
  const [errorVisible, showError, dismissError] = useDisclosure();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user, error } = useSelector(state => state.auth);

  // console.log(googleLoginCfg);

  const handleGoogleLogin = async () => {
    try {
      const { idToken } = await Google.logInAsync(googleLoginCfg);
      dispatch(login({ token: idToken, provider: 'Google' }));
      await new Promise(res => setTimeout(res, 1000));
      if (error) showError();
      else navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleBackButtonPress = () => navigation.goBack();

  return (
    <SafeAreaContainer>
      <Surface style={styles.container}>
        <Button icon='google' onPress={handleGoogleLogin} mode='outlined'>
          Login with Google
        </Button>
        <Button icon='chevron-left' onPress={handleBackButtonPress}>
          Back
        </Button>
      </Surface>
      <Snackbar
        visible={errorVisible}
        onDismiss={dismissError}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}
      >
        Hey there! I'm a Snackbar.
      </Snackbar>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
