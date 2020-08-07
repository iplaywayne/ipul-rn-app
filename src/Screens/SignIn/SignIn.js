import React from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View,
  Text, StatusBar, NativeModules, Button
} from 'react-native';
import { Header, Colors, } from 'react-native/Libraries/NewAppScreen';

const SignIn = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {/* <Header /> */}
    {/* <StatusBar barStyle="dark-content" backgroundColor='blue' /> */}
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
    // style={styles.scrollView}
    >
      <Button title='Sign In' onPress={() => navigation.push('Home')} />
      <Button title='Sign Up' onPress={() => navigation.push('Sign Up')} />
      {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}
      {/* <Button title='Get Modules' onPress={getModules} /> */}
    </ScrollView>
  </View>
)

export default SignIn