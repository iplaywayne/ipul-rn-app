import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  SignIn as SignInScreen, Home as HomeScreen,
  SignUp, Tabs
} from './Screens'

import { Store, useStore } from './utils/store'
import { Center } from './components/Center'


const Explore = (props) => {
  console.log('explore props', props.route.params)
  return (
    <View>
      <Text>This is explore</Text>
    </View>
  )
}

const AuthContext = React.createContext();
export const useAuth = () => React.useContext(AuthContext)

const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();


const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} options={{
      headerShown: false
    }} />
    <Drawer.Screen name="Dashboard" component={HomeScreen} />
    <Drawer.Screen name="Explore" component={Explore} />
    <Drawer.Screen name="Media" component={HomeScreen} />
    <Drawer.Screen name="Notifications" component={HomeScreen} />
  </Drawer.Navigator>
)

const AppStackNavigator = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Home" component={DrawerNavigator} options={{
      headerShown: false
    }} />
    <AppStack.Screen name="Explore" component={HomeScreen} options={{
      headerShown: false
    }} />
  </AppStack.Navigator>
)


export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setTimeout(() => {
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      }, 250)
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  if (state.isLoading) {
    return <Center><Text>Loading . .</Text></Center>
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
          {state.userToken == null ? (
            <AuthStack.Navigator>
              <AuthStack.Screen name="Sign In" component={SignInScreen} options={{
                title: 'Sign In',
                headerShown: false,
                animationTypeForReplace: state.userToken ? 'pop' : 'push'
              }} />
              <AuthStack.Screen name="Sign Up" component={SignUp} />
            </AuthStack.Navigator>
          ) : (
              <AppStackNavigator />
            )}
      </AuthContext.Provider>
    </NavigationContainer>
  );
}