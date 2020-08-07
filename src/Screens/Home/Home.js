import React from 'react'
import { View, Text, Button } from 'react-native'
import { Appbar } from 'react-native-paper'
import { CommonActions } from '@react-navigation/native';


import { Center } from '../../components/Center'
import { useAuth } from '../../utils'

function Home({ navigation }) {
  const auth = useAuth()

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.dispatch(
        CommonActions.navigate({
          name: 'Explore',
          params: {
            user: 'jane',
          },
        })
      )} />
    </Appbar.Header>
  )
  // return (
  //   <Center>
  //     <Text>You are home buddy</Text>
  //     <Button title='Sign Out' onPress={() => auth.signOut()} />
  //   </Center>
  // )
}

export default Home
