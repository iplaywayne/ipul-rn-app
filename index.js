import React from 'react';
import { AppRegistry } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';

import AuthProvider from './src/contexts/AuthContext'
import { StoreProvider } from './src/utils/store'

export default function Main() {
  return (
    <AuthProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);