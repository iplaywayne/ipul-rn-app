import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View,
  Text, StatusBar, NativeModules, Button
} from 'react-native';
import { Header, Colors, } from 'react-native/Libraries/NewAppScreen';
import axios from 'axios'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SignIn, SignUp, Tabs } from './Screens'
import { domain } from './constants'
import { Center } from './components/Center'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Dashboard = () => (
  <Center>
    <Text>You are in Dashboard</Text>
  </Center>
)
const Explore = () => (
  <Center>
    <Text>You are in Explore</Text>
  </Center>
)
const HomeNavigator = () => (
  <Drawer.Navigator initialRouteName="Dashboard">
    <Drawer.Screen name="Dashboard" component={Dashboard} />
    <Drawer.Screen name="Explore" component={Explore} />
  </Drawer.Navigator>
)


const App = () => {
  const [data, setData] = React.useState('Loading . .')

  React.useEffect(() => {
    (async function () {
      const { data } = await axios.post(`${domain}/api/products`)
      setData(data)
    })()
  }, [])

  const getModules = React.useCallback(() => {
    console.log(firebase.auth().currentUser)
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign In">
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Home" component={HomeNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
