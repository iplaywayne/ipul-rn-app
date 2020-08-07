import React from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View,
  Text, StatusBar, NativeModules, Button
} from 'react-native';

const SignUp = () => (
  <SafeAreaView>
    <StatusBar barStyle="dark-content" backgroundColor='blue' />
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
    // style={styles.scrollView}
    >
      {/* <Header /> */}
      {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}
      {/* <Button title='Get Modules' onPress={getModules} /> */}
    </ScrollView>
  </SafeAreaView>
)

export default SignUp