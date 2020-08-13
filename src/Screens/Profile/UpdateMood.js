import React from 'react'
import { ScrollView, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import Button from 'react-native-button'
import { CommonActions } from '@react-navigation/native';
import { Divider, Text, TextInput } from 'react-native-paper';
import Animated from 'react-native-reanimated'
import { List, RadioButton } from 'react-native-paper';

import { Center } from '../../components'
import { useAuth, useStore, wait } from '../../utils'


function UpdateProfile({ navigation }) {
  const [authState] = useAuth()
  const [storeState] = useStore()
  const [loading, setLoading] = React.useState(false)
  const { user } = authState
  const { name, bio } = user && user

  const [formState, setFormState] = React.useState({
    name: name,
    bio: bio
  })


  const handleGoBack = async () => {
    await wait(() => setLoading(true))
    await wait(() => setLoading(false), 750)
    navigation.goBack()
  }

  const handleCancel = async () => {
    navigation.goBack()
  }

  const listener = () => {

  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button style={{ marginLeft: 20 }} onPress={handleCancel}>
          {'Cancel'}
        </Button>
      ),
      headerRight: () => (
        <Button style={{ marginRight: 20 }} onPress={handleGoBack}>
          {loading ? <ActivityIndicator style={{ marginRight: 30 }} /> : 'Done'}
        </Button>
      )
    })
  }, [loading])


  const moodArray = [
    { id: 1, emoji: '😌', title: 'Jus Chillin', description: 'R & B, Reggae, Soul' },
    { id: 2, emoji: '🥳', title: 'Club Ready', description: 'Hip Hop, Trap, Dancehall' },
  ]

  return (
    <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>



      {moodArray.map((itm, idx) => (
        <TouchableOpacity onPress={() => console.log(itm)}>
          <List.Item
            title={itm.title}
            description={itm.description}
            left={() => <Text style={{ padding: 10 }}>{itm.emoji}</Text>}
          // right={() => <RadioButton
          //   value="second"
          //   status={'checked'}
          //   onPress={() => console.log('second')}
          // />}
          />
        </TouchableOpacity>
      ))}

      {/* <Text>{JSON.stringify(user, null, 2)}</Text> */}
    </ScrollView>
  )
}

const styles = {
  title: {
    fontWeight: '700',
    fontSize: 25,
    padding: 20
  },
  subTitle: {
    fontSize: 15,
    padding: 10
  }
}
export default UpdateProfile
