import React, { useEffect } from 'react';
// import * as Google from 'expo-google-app-auth';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Snackbar, Surface } from 'react-native-paper';
import { login } from '../store/slices/authSlice';
import { StyleSheet } from 'react-native';
import { SafeAreaContainer } from '../components/common';
import { useNavigation } from '@react-navigation/core';
import { googleLoginCfg } from '../config/googleConfig';
import useDisclosure from '../hooks/useDisclosure';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

function LoginScreen(props) {
  const navigation = useNavigation();
  const [request, response, promptAsync] = Google.useAuthRequest(googleLoginCfg);
  const dispatch = useDispatch();

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log(authentication.accessToken)
      dispatch(login({ token: authentication.accessToken, provider: 'Google' }));
      // await new Promise(res => setTimeout(res, 1000));
      // if (error) showError();
      // else navigation.goBack();
    }
  }, [response]);
  // const [errorVisible, showError, dismissError] = useDisclosure();
  // const { user, error } = useSelector(state => state.auth);

  // // console.log(googleLoginCfg);

  // const handleGoogleLogin = async () => {
  //   try {
  //     const { idToken } = await Google.logInAsync(googleLoginCfg);
  //     dispatch(login({ token: idToken, provider: 'Google' }));
  //     await new Promise(res => setTimeout(res, 1000));
  //     if (error) showError();
  //     else navigation.goBack();
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  const handleBackButtonPress = () => navigation.goBack();

  return (
    <SafeAreaContainer>
      <Surface style={styles.container}>
        <Button 
          icon='google' 
          onPress={() => {
            promptAsync();
          }}
          mode='outlined'
          disabled={!request}
        >
          Login with Google
        </Button>
        <Button icon='chevron-left' onPress={handleBackButtonPress}>
          Back
        </Button>
      </Surface>
      {/* <Snackbar
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
      </Snackbar> */}
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
