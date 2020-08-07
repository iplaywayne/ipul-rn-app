import React from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View,
  Text, StatusBar, NativeModules, Button
} from 'react-native';
import { Header, Colors, } from 'react-native/Libraries/NewAppScreen';

const SignIn = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
    // style={styles.scrollView}
    >
      <Button title='Sign In' onPress={() => navigation.replace('Home')} />
      <Button title='Sign Up' onPress={() => navigation.push('Sign Up')} />
    </ScrollView>
  </View>
)

export default SignIn