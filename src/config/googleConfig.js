import {
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
  ANDROID_STANDALONE_APP_CLIENT_ID,
} from '@env';

export const googleLoginCfg = {
  iosClientId: IOS_CLIENT_ID,
  androidClientId: ANDROID_CLIENT_ID,
  androidStandaloneAppClientId: ANDROID_STANDALONE_APP_CLIENT_ID,
  // behavior: 'web',
  scopes: ['profile', 'email'],
};
