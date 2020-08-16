import React from 'react'
import { View, Text, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
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
  const [captureMode, setCaptureMode] = React.useState(null)
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

  const handlePostReset = () => {
    if (captured) {
      setCaptured(null)
      setCaptureType(null)
      setCaptureMode(null)
    } else {
      navigation.goBack()
    }
  }

  const handlePostDone = () => {
    
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
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
          <Button disabled={!captured || !captureMode}
            onPress={handlePostTask}>
            {loading ? <ActivityIndicator /> : 'Done'}
          </Button>
        </View>
      ),
    })
  }, [captured, captureMode])


  return (
    <View style={{
      backgroundColor: '#121212', flex: 1, flexDirection: 'column', marginTop: -25
    }}>

      <View style={{
        position: 'relative', zIndex: 100, top: 110, flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 30,
      }}>
        <TouchableOpacity onPress={handlePostReset} style={{ alignSelf: 'flex-start' }}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>
            {captured ? 'Reset' : 'Cancel'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePostDone} style={{ alignSelf: 'flex-end' }}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>
            {captured && 'Done'}
          </Text>
        </TouchableOpacity>
      </View>


      {captureType == 'image' &&
        <CropImage
          captured={captured}
          onComplete={uri => console.log('[CROPIMAGE]', uri)}
        />}

      {captureType == 'video' &&
        <VideoPlayer
          source={captured}
          resetSource={() => setCaptured(null)}
        />}

      {!captured &&
        <View style={{ flex: 1 }}>
          <View style={{ flex: 11 }}>
            <Camera
              mode={captureMode}
              dataUri={uri => setCaptured(uri)}
              dataType={type => setCaptureType(type)}
            />
          </View>

          <View style={{
            flex: 1, flexDirection: 'row', alignItems: 'center',
            justifyContent: 'space-around', marginHorizontal: 25
          }}>
            <TouchableOpacity onPress={() => setCaptureMode('camera')}
              style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="camera"
                color={captureMode == 'camera' ? 'white' : 'gray'}
                size={26} />
              <Text style={{ color: captureMode == 'camera' ? 'white' : 'gray' }}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCaptureMode('video')}
              style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons name="video"
                color={captureMode == 'video' ? 'white' : 'gray'}
                size={26} />
              <Text style={{ color: captureMode == 'video' ? 'white' : 'gray' }}>Take Video</Text>
            </TouchableOpacity>
          </View>


          {/* <Tab.Navigator
            initialRouteName="Home"
            activeColor="#f0edf6"
            inactiveColor="#444"
            onTabPress={p => console.log(p)}
            barStyle={{ height: 60, backgroundColor: '#121212' }}
          >
            <Tab.Screen
              name="Camera"
              children={() => <View></View>}
              options={{
                tabBarLabel: 'Take Photo',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="camera" color={color} size={26} />
                ),
              }} />
            <Tab.Screen
              name="Gallery"
            children={() => <View></View>}
              options={{
                tabBarLabel: 'Take Video',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="video" color={color} size={26} />
                ),
              }} />
          </Tab.Navigator> */}
        </View>}

    </View>
  )
}