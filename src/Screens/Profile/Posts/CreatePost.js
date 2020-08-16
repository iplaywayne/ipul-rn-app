import React from 'react'
import { View, Text, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import Button from 'react-native-button'
import FastImage from 'react-native-fast-image'
import { Input as TextInput } from 'galio-framework'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Camera from '../../../components/Camera/Camera'
import VideoPlayer from '../../../components/Video/VideoPlayer'
import Btn from '../../../components/Prebuilt/Button'
import { height, width } from '../../../constants'
import CropImage from '../../../components/Profile/CropImage'
import { useAuth } from '../../../utils'


const Tab = createMaterialTopTabNavigator();
const TypeTab = createMaterialBottomTabNavigator();


export function CreatePost({ navigation }) {
  const [captured, setCaptured] = React.useState(null)
  const [captureType, setCaptureType] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [postCaption, setPostCaption] = React.useState('')
  const playerRef = React.useRef(null)
  const [authState] = useAuth()
  const { user } = authState

  const handlePostTask = () => {
    if (!postCaption || !captureType) {
      console.log({ message: 'Missing handlePostTask param', postCaption, capturedType })
      return
    }
    const details = {
      uid: user.uid,
      caption: postCaption,
      type: captureType,
      [captureType]: captured,
    }
    navigation.navigate('Profile', {
      details
    })
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <Button style={{ marginLeft: 20 }} onPress={() => navigation.goBack()}>
          {'Cancel'}
        </Button>
      ),
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Button onPress={handlePostTask}>
            {loading ? <ActivityIndicator /> : 'Done'}
          </Button>
        </View>
      ),
    })
  })


  if (!captured) {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Camera" children={() => (<Camera
          dataUri={uri => setCaptured(uri)}
          dataType={type => setCaptureType(type)}
        />)} />
        <Tab.Screen name="Gallery" children={() => <View><Text>Gallery</Text></View>} />
      </Tab.Navigator>
    )
  }

  const CapturedImage = () => (
    <FastImage
      source={{ uri: captured, priority: FastImage.priority.normal }}
      style={{ flex: 1, borderRadius: 0, width: width, height: height + 200 }}
      resizeMode={FastImage.resizeMode.cover}
    />
  )

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