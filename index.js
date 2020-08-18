import React from 'react';

import { AppRegistry, LogBox, StatusBar } from 'react-native';
import TrackPlayer from 'react-native-track-player'

import App from './src/App';
import { name as appName } from './app.json';

import AuthProvider from './src/contexts/AuthContext'
import StoreProvider from './src/contexts/StoreContext'


export default function Main() {
  LogBox.ignoreAllLogs()

  return (
    <StoreProvider>
      <AuthProvider>
        <StatusBar barStyle='dark-content' />
        <App />
      </AuthProvider>
    </StoreProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
TrackPlayer.registerPlaybackService(() => require('./service.js'));