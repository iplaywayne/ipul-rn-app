import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { Center } from '../../components/Center'
const { width, height } = Dimensions.get('window')

function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/ipul_logo_trans.png')}
          style={styles.logo} />
        <Text>Welcome to iPlayuListen</Text></View>
      <View style={styles.footer}>

        <Text style={styles.title}>New sounds on the rise!</Text>
        <Text style={styles.text}>We're all about creative arts</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Sign In')}>
          <LinearGradient
            colors={['#235566', '#01a483']} style={styles.signIn} >
            <Text style={styles.textGo}>Let's Go</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  },
  title: {
    color: '#05374a',
    fontSize: 30,
    fontWeight: 'bold'
  },
  text: {
    marginTop: 20
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row'
  },
  textGo: {
    color: 'white'
  }
})
export default SplashScreen
