import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  configureFonts,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Inter_400Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Inter_500Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Inter_300Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Inter_200ExtraLight',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Inter_400Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Inter_500Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Inter_300Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Inter_200ExtraLight',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Inter_400Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Inter_500Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Inter_300Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Inter_200ExtraLight',
      fontWeight: 'normal',
    },
  },
};

// PaperDefaultTheme.colors.

export const darkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  roundness: 4,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    background: '#fff',
    primary: 'coral',
    accent: 'tomato',
  },
  fonts: configureFonts(fontConfig),
};

export const defaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  roundness: 4,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: '#fff',
    // primary: 'coral',
    // accent: 'tomato',
    primary: '#ff80ab',
    accent: '#ff4181',
  },
  fonts: configureFonts(fontConfig),
};
