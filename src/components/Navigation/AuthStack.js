import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';


import SplashScreen from '../../screens/SplashScreen/SplashScreen'
import { SignIn as SignInScreen } from '../../screens/SignIn'
import { SignUp as SignUpScreen } from '../../screens/SignUp'


const AuthStack = createStackNavigator();


function AuthStackNavigator({ userToken }) {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SplashScreen" component={SplashScreen} options={{
        headerShown: false,
        animationTypeForReplace: userToken ? 'pop' : 'push'
      }} />
      <AuthStack.Screen name="Sign In" component={SignInScreen} options={{
        headerShown: false,
        animationTypeForReplace: userToken ? 'pop' : 'push'
      }} />
      <AuthStack.Screen name="Sign Up" component={SignUpScreen} options={{
        // headerShown: false,
        animationTypeForReplace: userToken ? 'pop' : 'push'
      }} />
    </AuthStack.Navigator>
  )
}

export default AuthStackNavigator
