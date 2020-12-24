import React from 'react';
import { SafeAreaView, AppRegistry, LogBox, StatusBar } from 'react-native';
import TrackPlayer from 'react-native-track-player'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './src/App';
import { name as appName } from './app.json';
import AuthProvider from './src/contexts/AuthContext'
import StoreProvider from './src/contexts/StoreContext'


export default function Main({ isHeadless }) {
  if (isHeadless) return null // if called in background, ignore and allow notifs

  LogBox.ignoreAllLogs()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
        <StoreProvider>
          <AuthProvider>
            <StatusBar barStyle='light-content' />
            <App />
          </AuthProvider>
        </StoreProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
TrackPlayer.registerPlaybackService(() => require('./service.js'));