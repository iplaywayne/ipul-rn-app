import React from 'react'
import { ScrollView, View, Animated, ActivityIndicator, Image } from 'react-native'
import Button from 'react-native-button'
import { CommonActions } from '@react-navigation/native';
import { Divider, Text, TextInput } from 'react-native-paper';

import { Center } from '../../components'
import { useAuth } from '../../contexts/AuthContext'
import { useStore } from '../../utils'

const wait = (cb = null, tm = 100) => {
  if (cb === null) return
  return new Promise((resolve) => {
    setTimeout(() => {
      cb()
      resolve()
    }, tm)
  })
}

function EditProfile({ navigation }) {
  const [authState] = useAuth()
  const [storeState] = useStore()
  const [loading, setLoading] = React.useState(false)
  const { user } = authState
  const name = user && user.name
  const [text, setText] = React.useState(name)
  const scrollY = React.useRef(new Animated.Value(0)).current
  const changingHeight = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [120, 60],
    extrapolate: 'clamp'
  })


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: false,
      headerRight: () => (
        <Button style={{ marginRight: 20 }} onPress={handleGoBack}>
          {loading ? <ActivityIndicator style={{ marginRight: 30 }} /> : 'Done'}
        </Button>
      )
    })
  }, [loading])

  const handleGoBack = async () => {
    await wait(() => setLoading(true))
    await wait(() => setLoading(false), 750)
    navigation.goBack()
  }
  const listener = () => {
  }


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
        disabled
        label="Username"
        value={text}
        onChangeText={text => setText(text)}
        type='outlined'
      />
      <Text>{JSON.stringify(user, null, 2)}</Text>
      <Text>{JSON.stringify(user, null, 2)}</Text>
      <Text>{JSON.stringify(user, null, 2)}</Text>
      <Divider />
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
