import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { SignIn as SignInScreen } from '../../screens/SignIn'
import { SignUp as SignUpScreen } from '../../screens/SignUp'
import { Home as HomeScreen } from '../../screens/Home'
import { Explore as ExploreScreen } from '../../screens/Explore'
import SplashScreen from '../../screens/SplashScreen/SplashScreen'
import DrawerContent from './DrawerContent'

const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigation Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        {props.icon}
        {/* <Image
          source={{ uri: 'https://www.iplayulisten.com/ipul-logo-2020.png' }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        /> */}
      </TouchableOpacity>
    </View>
  );
}

const AppStackNavigator = ({ navigation }) => (
  <AppStack.Navigator>
    <AppStack.Screen name="Home" component={HomeScreen} options={{
      title: 'iPlayuListen',
      headerTransparent: false,
      headerLeft: props => (
        <NavigationDrawerStructure
          navigationProps={navigation}
          icon={<Icon name='dots-horizontal' size={25} style={{ marginLeft: 20 }} />}
        />
      ),
      headerRight: props => (
        <NavigationDrawerStructure
          navigationProps={navigation}
          icon={<Icon name='dots-horizontal' size={25} style={{ marginRight: 20 }} />}
        />
      )
    }} />
    <AppStack.Screen name="Explore" component={ExploreScreen} />
  </AppStack.Navigator>
)

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={DrawerContent}>
    <Drawer.Screen name="Home" component={AppStackNavigator} />
    <Drawer.Screen name="Dashboard" component={ExploreScreen} />
    <Drawer.Screen name="Explore" component={ExploreScreen} />
    <Drawer.Screen name="Media" component={ExploreScreen} />
    <Drawer.Screen name="Notifications" component={ExploreScreen} />
  </Drawer.Navigator>
)

export default DrawerNavigator
