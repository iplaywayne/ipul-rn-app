import React from 'react'
import { View, Text, Button,SafeAreaView } from 'react-native'
import { CommonActions } from '@react-navigation/native';


import { Center } from '../../components/Center'
import { useAuth } from '../../contexts/AuthContext'


function Home({ navigation }) {
  const [{ user },authDispatch] = useAuth()
  const { name } = (user && user.name) ?? 'Guest'

  return (
    <SafeAreaView>
      <Text>{JSON.stringify(user, null, 2)}{name}</Text>
      <Button title='Sign Out' onPress={() => authDispatch.signOut()} />
    </SafeAreaView>
  )
}

export default Home
