import React from 'react';
import {
  SafeAreaView, StyleSheet, ScrollView, View, Image,
  Text, StatusBar, NativeModules, Button, TextInput
} from 'react-native';
import { Header, Colors, } from 'react-native/Libraries/NewAppScreen';
import axios from 'axios'
import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'


import { domain } from '../../constants'
import { Center } from '../../components/Center'
import { useStore, useStoreUpdate } from '../../utils/store'
import { useAuth } from '../../utils'


const SignIn = (props) => {
  const { signIn, navigation } = props
  const [state, dispatch] = useStore()
  const { test } = useStoreUpdate()
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const auth = useAuth()
  // const [data, setData] = React.useState('Loading . .')

  // React.useEffect(() => {
  //   (async function () {
  //     const { data } = await axios.post(`${domain}/api/products`)
  //     setData(data)
  //   })()
  // }, [])

  // const getModules = React.useCallback(() => {
  //   console.log(firebase.auth().currentUser)
  // }, [])

  return (
    <Center>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Image source={require('../../assets/images/ipul_logo_trans.png')}
            style={{ width: 200, height: 200, marginTop: 60 }} />
        </View>
        <View style={{ flex: 2 }}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Sign in" onPress={() => {
            auth.signIn({ username, password })
            console.log(auth)
          }
          } />
          <Button icon='camera' title="Sign up" onPress={() => navigation.push('Sign Up')} />
        </View>
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
});


export default SignIn