import React from 'react'
import { View, Text, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import Button from 'react-native-button'
import FastImage from 'react-native-fast-image'
import { Input as TextInput } from 'galio-framework'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Camera from '../../../components/Camera/Camera'
import VideoPlayer from '../../../components/Video/VideoPlayer'
import Btn from '../../../components/Prebuilt/Button'
import { height, width } from '../../../constants'
import CropImage from '../../../components/Profile/CropImage'
import { firebase, useAuth } from '../../../utils'


// const Tab = createMaterialTopTabNavigator();
const Tab = createMaterialBottomTabNavigator();


export function CreatePost({ navigation }) {
  const [captured, setCaptured] = React.useState(null)
  const [captureType, setCaptureType] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [postCaption, setPostCaption] = React.useState('')
  const playerRef = React.useRef(null)
  const [authState] = useAuth()
  const { user } = authState

  const handlePostTask = () => {
    if (!postCaption) {
      console.log({ message: 'Missing handlePostTask param', postCaption })
      return
    }
    const details = {
      uid: user.uid,
      caption: postCaption,
      type: captureType,
      [captureType]: captured,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    }
    navigation.navigate('Profile', {
      details
    })
    console.log(details)
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <Button style={{ marginLeft: 20 }} onPress={() => {
          if (!captured) navigation.goBack()
          setCaptureType(null)
          setCaptured(null)
        }}>
          {captured ? 'Reset' : 'Cancel'}
        </Button>
      ),
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Button disabled={!captured || !captureType}
            onPress={handlePostTask}>
            {loading ? <ActivityIndicator /> : 'Done'}
          </Button>
        </View>
      ),
    })
  })


  if (!captured) {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f0edf6"
        inactiveColor="#444"
        barStyle={{ height: 60, backgroundColor: '#121212' }}>
        <Tab.Screen
          name="Camera"
          children={() => (<Camera
            takePicture
            dataUri={uri => setCaptured(uri)}
            dataType={type => setCaptureType(type)}
          />)}
          options={{
            tabBarLabel: 'Take Photo',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="camera" color={color} size={26} />
            ),
          }} />
        <Tab.Screen
          name="Gallery"
          children={() => (<Camera
            takeVideo
            dataUri={uri => setCaptured(uri)}
            dataType={type => setCaptureType(type)}
          />)} options={{
            tabBarLabel: 'Take Video',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="video" color={color} size={26} />
            ),
          }} />
      </Tab.Navigator>
    )
  }


  const CapturedVideo = () => (
    <View style={{ flex: 1 }}>

      <VideoPlayer
        source={captured}
        resetSource={() => setCaptured(null)}
      />
    </View>
  )

  return (
    <View style={{
      backgroundColor: '#121212',
      flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
    }}>


      {captureType == 'image' &&
        <CropImage
          captured={captured}
          onComplete={uri => console.log('[CROPIMAGE]', uri)}
        />}

      {captureType == 'video' &&
        <CapturedVideo playerRef={ref => playerRef.current = ref} />}



      {/* <Text style={{ fontWeight: '700', fontSize: 17, paddingLeft: 15 }}>
            What would you like to share?</Text>
          <View style={{ paddingHorizontal: 10, paddingBottom: 0 }}>
            <TextInput
              onChange={e => setPostCaption(e.nativeEvent.text)}
            />
          </View> */}
      {/* {playerRef.current &&
            <Btn title='Replay' onPress={() => playerRef.current.seek(0)}>
              Replay
          </Btn>}

          <Btn title='Start over' onPress={() => setCaptured(null)} />
 */}

    </View>
  )
}