import React from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View, Image, Dimensions, ActivityIndicator,
  Text, StatusBar, NativeModules, Button as Btn, TextInput as TI, TouchableOpacity, Alert
} from 'react-native';
import { Header, Colors, } from 'react-native/Libraries/NewAppScreen';
import axios from 'axios'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import { Card } from 'galio-framework';
import Button from 'react-native-button'
import Spinner from 'react-native-spinkit'
import { Input as TextInput, Toast, Block } from 'galio-framework';


import { domain } from '../../constants'
import { Center } from '../../components/Center'
import { useStore } from '../../utils/store'
import { useAuth } from '../../contexts/AuthContext'

const { width, height } = Dimensions.get('window')

const SignIn = (props) => {
  const { signIn, navigation } = props
  const [state, dispatch] = useStore()
  const [username, setUsername] = React.useState('stylz@iplayulisten.com')
  const [password, setPassword] = React.useState('admin20')
  const [authState, authDispatch] = useAuth()
  const { isLoading } = authState
  const [signInLoading, setSignInLoading] = React.useState(false)
  const [signUpLoading, setSignUpLoading] = React.useState(false)
  const [isShow, setShow] = React.useState(false);
  const [success, setSuccess] = React.useState(false)
  const [failed, setFailed] = React.useState(false)

  const handleSignIn = () => {
    setFailed(false)
    setSuccess(false)
    setSignInLoading(true)
    setTimeout(() => {
      authDispatch.signIn({ username, password },
        success => {
          Alert.alert(success)
          setSuccess(true)
          setSignInLoading(false)
        },
        error => {
          Alert.alert(error)
          setFailed(true)
          setSignInLoading(false)
        })
    }, 1000)
  }

  const handleSignUp = () => {
    setSignUpLoading(true)
    setTimeout(() => {
      setSignUpLoading(false)
    }, 2000)
  }


  if (isLoading) return <Center><Spinner /></Center>


  return (
    <Center>
      <ScrollView showsVerticalScrollIndicator={false}
        style={{ width: '100%', backgroundColor: '#235566' }}
        contentContainerStyle={{ alignItems: 'center' }}>

        <Toast isShow={success} positionIndicator="bottom" color="success" useNativeDriver={true}>
          Authorization was successful!
        </Toast>

        <Toast isShow={failed} positionIndicator="bottom" color="warning" useNativeDriver={true}>
          We could not authenticate your account
        </Toast>

        <View style={{ flex: 1 }}>
          <Image source={require('../../assets/images/ipul_logo_trans.png')}
            style={{ width: 200, height: 200, marginTop: 60 }} />
        </View>
        <View style={{ flex: 2,marginBottom:100 }}>
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
          <Text style={[styles.label, { color: '#121212' }]}>Forgot your password?</Text>
          <View style={styles.buttons}>
            <Button
              style={{ fontSize: 15, color: 'white', width: '100%' }}
              styleDisabled={{ color: 'white' }}
              // disabled={isLoading}
              containerStyle={{ padding: 10, margin: 5, height: 40, overflow: 'hidden', borderRadius: 5, backgroundColor: '#121212' }}
              disabledContainerStyle={{ backgroundColor: '#ddd' }}
              onPress={() => handleSignIn()}
            >
              {signInLoading ? <ActivityIndicator /> : 'Sign In'}
            </Button>
            <Button
              style={{ fontSize: 15, color: 'white', width: '100%' }}
              styleDisabled={{ color: 'white' }}
              // disabled={isLoading}
              containerStyle={{ padding: 10, margin: 5, height: 40, overflow: 'hidden', borderRadius: 5, backgroundColor: '#121212' }}
              disabledContainerStyle={{ backgroundColor: '#ddd' }}
              onPress={() => navigation.push('Sign Up')}
            >
              {signUpLoading ? <ActivityIndicator /> : 'Sign Up'}
            </Button>
          </View>
        </View>
        {/* <Text>
          {JSON.stringify(authState, null, 2)}
        </Text> */}
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
    width: 350,
    borderColor: '#ddd'
  },
  passInput: {
    color: '#fff',
    margin: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 25,
    width: 350,
    borderColor: '#ddd'
  },
  label: {
    marginLeft: 15
  },
  buttons: {
    flex: 1,
    marginTop: 30,
    // margin: 'auto',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignContent: 'center',
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