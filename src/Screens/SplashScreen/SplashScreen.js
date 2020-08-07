import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'

import { Center } from '../../components/Center'
const { width, height } = Dimensions.get('window')

function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/ipul_logo_trans.png')}
          style={styles.logo} />
        <Text>Welcome to iPlayuListen</Text></View>
      <View style={styles.footer}><Text>We're all about creative arts</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#235566',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    height: height * .2,
    width: width * .7,
  }
})
export default SplashScreen
