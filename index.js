import React from 'react';
import { AppRegistry, LogBox, StatusBar } from 'react-native';
import TrackPlayer from 'react-native-track-player'

import App from './src/App';
import { name as appName } from './app.json';

import AuthProvider from './src/contexts/AuthContext'
import { StoreProvider } from './src/utils/store'

export default function Main() {
  LogBox.ignoreAllLogs()

  return (
    <AuthProvider>
      <StatusBar barStyle='dark-content' />
      <StoreProvider>
        <App />
      </StoreProvider>
    </AuthProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
TrackPlayer.registerPlaybackService(() => require('./service.js'));