import React from 'react'
import { View, Text, Button } from 'react-native'
import { CommonActions } from '@react-navigation/native';


import { Center } from '../../components/Center'

function Home({ navigation }) {

  return (
    <Center>
      <Text>You are home buddy</Text>
      {/* <Button title='Sign Out' onPress={() => auth.signOut()} /> */}
    </Center>
  )
}

export default Home
