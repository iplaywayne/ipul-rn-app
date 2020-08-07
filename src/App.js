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

const AuthContext = React.createContext();
export const useAuth = () => React.useContext(AuthContext)

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const MainNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Dashboard" component={HomeScreen} />
    <Drawer.Screen name="Explore" component={HomeScreen} />
    <Drawer.Screen name="Media" component={HomeScreen} />
    <Drawer.Screen name="Notifications" component={HomeScreen} />
  </Drawer.Navigator>
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
      }, 0)
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
        <Store>
          <Stack.Navigator>
            {state.userToken == null ? (
              <Stack.Screen name="Sign In" component={SignInScreen}/>
            ) : (
                <Stack.Screen name="Home" component={MainNavigator} />
              )}
          </Stack.Navigator>
        </Store>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
// import React from 'react';
// import {
//   SafeAreaView, StyleSheet, ScrollView, View,
//   Text, StatusBar, NativeModules, Button
// } from 'react-native';
// import { Header, Colors, } from 'react-native/Libraries/NewAppScreen';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import { SignIn, SignUp, Tabs } from './Screens'
// import { domain } from './constants'
// import { Center } from './components/Center'
// import { Store, useStore } from './utils/store'


// const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();


// const Dashboard = () => (
//   <Center>
//     <Text>You are in Dashboard</Text>
//   </Center>
// )
// const Explore = () => (
//   <Center>
//     <Text>You are in Explore</Text>
//   </Center>
// )


// const HomeNavigator = () => (
//   <Drawer.Navigator initialRouteName="Explore">
//     <Drawer.Screen name="Dashboard" component={Dashboard} />
//     <Drawer.Screen name="Explore" component={Explore} />
//     <Drawer.Screen name="Media" component={Explore} />
//     <Drawer.Screen name="Notifications" component={Explore} />
//   </Drawer.Navigator>
// )

// const App = () => {
//   const [userToken, setUserToken] = React.useState(null)

//   return (
//     <Store>
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Sign In">
//           {userToken == null ?
//             (
//               <Stack.Screen name="Sign In" component={SignIn} options={{
//                 title: 'Sign In',
//                 animationTypeForReplace: userToken ? 'pop' : 'push'
//               }} />
//             ) : (
//               <Stack.Screen name="Home" component={HomeNavigator} />
//             )}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Store>
//   );
// };

// export default App