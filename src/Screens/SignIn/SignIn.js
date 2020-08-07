import React from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View, Image, Dimensions,
  Text, StatusBar, NativeModules, Button, TextInput, TouchableOpacity
} from 'react-native';
import { Header, Colors, } from 'react-native/Libraries/NewAppScreen';
import axios from 'axios'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import { Card } from 'galio-framework';

import { domain } from '../../constants'
import { Center } from '../../components/Center'
import { useStore, useStoreUpdate } from '../../utils/store'
import { useAuth } from '../../contexts/AuthContext'

const { width, height } = Dimensions.get('window')

const SignIn = (props) => {
  const { signIn, navigation } = props
  const [state, dispatch] = useStore()
  const { test } = useStoreUpdate()
  const [username, setUsername] = React.useState('dev@iplayulisten.com')
  const [password, setPassword] = React.useState('admin20')
  const [authState, authDispatch] = useAuth()


  return (
    <Center>
      <ScrollView style={{ width: '100%', backgroundColor: '#235566' }}
        contentContainerStyle={{ alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <Image source={require('../../assets/images/ipul_logo_trans.png')}
            style={{ width: 200, height: 200, marginTop: 60 }} />
        </View>
        <View style={{ flex: 2, alignItems: 'flex-start' }}>
          <Text style={styles.label}>Your email address</Text>
          <TextInput
            placeholder="Username"
            placeholderTextColor='#ddd'
            value={username}
            onChangeText={setUsername}
            style={styles.userInput}
          />
          <Text style={styles.label}>Your password</Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor='#ddd'
            value={password}
            onChangeText={setPassword}
            style={styles.passInput}
            secureTextEntry
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.signIn} onPress={() => {
              authDispatch.signIn({ username, password })
            }}>
              <Text>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signIn} onPress={() => {
              navigation.push('Sign Up')
            }}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text>
          {JSON.stringify(authState, null, 2)}
        </Text>
      </ScrollView>
    </Center>
  )

}

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
  userInput: {
    color: '#fff',
    margin: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 25,
    width: width * .8,
    borderColor: '#ddd'
  },
  passInput: {
    color: '#fff',
    margin: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 25,
    width: width * .8,
    borderColor: '#ddd'
  },
  label: {
    marginLeft: 15
  },
  buttons: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  signIn: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    width: 100,
    marginLeft: 10
  },
  signUp: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    width: 100
  }
});


export default SignIn