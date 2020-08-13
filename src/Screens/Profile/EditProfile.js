import React from 'react'
import { ScrollView, View, ActivityIndicator, Image } from 'react-native'
import Button from 'react-native-button'
import { CommonActions } from '@react-navigation/native';
import { Divider, Text, TextInput } from 'react-native-paper';
import Animated from 'react-native-reanimated'

import { Center } from '../../components'
import { useAuth, useStore, wait } from '../../utils'


function EditProfile({ navigation }) {
  const [authState] = useAuth()
  const [storeState] = useStore()
  const [loading, setLoading] = React.useState(false)
  const { user } = authState
  const { name, bio } = user && user

  const [formState, setFormState] = React.useState({
    name: name,
    bio: bio
  })

  const scrollY = React.useRef(new Animated.Value(0)).current
  
  const changingHeight = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [120, 60],
    extrapolate: 'clamp'
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



  return (
    <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}
    // onScroll={Animated.event(
    //   [{ nativeEvent: { contentOffset: { x: scrollY } } }], { listener }
    // )}
    >
      <Animated.View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Image source={require('../../assets/images/iPlay2020Logo.png')}
          style={{ height: 100, width: 100, borderRadius: 100 / 2 }} />
      </Animated.View>

      {/* <Text style={styles.title}>Settings</Text> */}
      {/* <Text style={styles.subTitle}>Your Username</Text> */}
      <TextInput
        // disabled
        label="Username"
        value={formState.name}
        onChangeText={val => setFormState(state => ({
          ...formState,
          name: val
        }))}
        type='outlined'
      />
      <Divider />

      <TextInput
        label="Bio"
        value={formState.bio}
        onChangeText={val => setFormState(state => ({
          ...formState,
          bio: val
        }))}
        type='outlined'
        multiline={true}
        height={120}
      />
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
export default EditProfile
