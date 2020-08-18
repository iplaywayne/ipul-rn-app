import React from 'react'
import { ScrollView, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import Button from 'react-native-button'
import { CommonActions } from '@react-navigation/native';
import { Divider, Text, TextInput, List, RadioButton } from 'react-native-paper';
import Animated from 'react-native-reanimated'

import { Center } from '../../components'
import { useAuth, useStore, wait } from '../../utils'
import { firebase, database } from '../../utils/firebase'


function UpdateProfile({ navigation }) {
  const [storeState, storeDispatch] = useStore()
  const [loading, setLoading] = React.useState(false)
  const { user } = storeState
  const { name, bio, mood } = user && user
  const [capturedMood, setCapturedMood] = React.useState(null)
  const previousMood = mood

  const handleGoBack = async () => {
    storeDispatch.setUser({ ...user, mood: previousMood })
    navigation.goBack()
  }

  const handleCapturedMood = () => {
    const usrRef = database.ref(`users/${user.uid}`)
    usrRef.update({
      mood: capturedMood
    })
    navigation.goBack()
  }

  React.useEffect(() => {
    if (capturedMood && 'id' in capturedMood) {
      console.log('Mood Changed', capturedMood.id)
      storeDispatch.setUser({ ...user, mood: capturedMood })
    }
    return () => { }
  }, [capturedMood])

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button style={{ marginLeft: 20 }} onPress={handleGoBack}>
          {'Cancel'}
        </Button>
      ),
      headerRight: () => (
        <Button disabled={capturedMood === null}
          style={{ marginRight: 20 }} onPress={handleCapturedMood}>
          {loading ? <ActivityIndicator style={{ marginRight: 30 }} /> : 'Done'}
        </Button>
      )
    })
    return () => { }
  }, [loading, capturedMood])


  const moodArray = [
    { id: 1, emoji: '😌', title: 'Jus Chillin', description: 'R & B, Reggae, Soul' },
    { id: 2, emoji: '🥳', title: 'Ready for the Club', description: 'Hip Hop, Trap, Dancehall' },
    { id: 3, emoji: '😇', title: 'Meditating', description: 'Various Soothing Sounds' },
    { id: 4, emoji: '🤘', title: 'Call of Duty', description: 'Hip Hop, Trap' },
    { id: 5, emoji: '🤘', title: 'Feeling curious, surprise me', description: 'Mixed Genres' },
    { id: 6, emoji: '🤘', title: 'None of these', description: 'Not sure at the moment, play everything' },
  ]

  return (
    <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>

      {!mood &&
        <View style={{ margin: 20, alignItems: 'center' }}>
          <Text style={{ fontWeight: '700', fontSize: 17 }}>You do not have your mood set</Text>
        </View>}

      {moodArray.map((itm, idx) => (
        <TouchableOpacity key={idx} onPress={() => setCapturedMood(itm)}>
          <Divider />
          <List.Item
            title={itm.title}
            description={itm.description}
            left={() => <Text style={{ padding: 10 }}>{itm.emoji}</Text>}
            right={() => <RadioButton
              value="second"
              status={mood && 'id' in mood && mood.id === itm.id ? 'checked' : 'unchecked'}
            />}
          />
        </TouchableOpacity>
      ))}
      <Divider />

      <View style={{ marginTop: 100, alignItems: 'center' }}>
        <Text style={{ fontWeight: '700', fontSize: 15, }}>
          Your playlist may populate based on your mood
        </Text>
      </View>

      {/* <Text>{JSON.stringify(capturedMood, null, 2)}</Text> */}
      {/* <Text>{JSON.stringify(user.mood, null, 2)}</Text> */}

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
