import React from 'react'
import { View, Text, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import Button from 'react-native-button'
import FastImage from 'react-native-fast-image'
import { Input as TextInput } from 'galio-framework'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Camera from '../../../components/Camera/Camera'
import VideoPlayer from '../../../components/Video/VideoPlayer'
import Btn from '../../../components/Prebuilt/Button'
import { height, width } from '../../../constants'
import CropImage from './CropImage'

const Tab = createMaterialTopTabNavigator();


export function CreatePost({ navigation }) {
  const [captured, setCaptured] = React.useState(null)
  const [captureType, setCaptureType] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const playerRef = React.useRef(null)


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
          <Button onPress={() => navigation.goBack()}>
            {loading ? <ActivityIndicator /> : 'Done'}
          </Button>
        </View>
      ),
    })
  })


  if (!captured) {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Camera" component={() => (
          <Camera
            dataUri={uri => setCaptured(uri)}
            dataType={type => setCaptureType(type)}
          />
        )} />
        <Tab.Screen name="Gallery" component={() => <View><Text>Gallery</Text></View>} />
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
    <VideoPlayer
      source={captured}
      resetSource={() => setCaptured(null)}
    />
  )

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>

      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#121212' }} behavior='padding'>

        <View style={{ marginTop: 30 }}>
          <Text style={{ fontWeight: '700', fontSize: 17, paddingLeft: 15, color: '#fff' }}>
            What would you like to share?</Text>
        </View>
        <View style={{ paddingHorizontal: 10, paddingBottom: 0 }}>
          <TextInput />
        </View>

        <View style={{
          marginTop: 0, marginBottom: 9,
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
        }}>
          {playerRef.current &&
            <Btn title='Replay' onPress={() => playerRef.current.seek(0)}>
              Replay
          </Btn>}

          <Btn title='Start over' onPress={() => setCaptured(null)} />
        </View>


        {captureType == 'image' &&
          <CropImage
            captured={captured}
            onComplete={uri => console.log(uri)}
          />}

        {captureType == 'video' &&
          <CapturedVideo playerRef={ref => playerRef.current = ref}/>}
        
      </KeyboardAvoidingView>
    </View>
  )
}