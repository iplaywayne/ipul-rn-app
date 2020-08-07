import React from 'react'
import { View, Text, Button } from 'react-native'

import { Center } from '../../components/Center'
import { useAuth } from '../../utils'

function Home() {
  const auth = useAuth()

  return (
    <Center>
      <Text>You are home buddy</Text>
      <Button title='Sign Out' onPress={() => auth.signOut()} />
    </Center>
  )
}

export default Home
