import React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import App from './src/App';
import { name as appName } from './app.json';
import { Store } from './src/utils/store'


const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000',
    accent: '#fff',
  },
};


export default function Main() {
  return (
    <Store>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Store>
  );
}

AppRegistry.registerComponent(appName, () => Main);