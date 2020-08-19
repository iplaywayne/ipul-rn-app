import React from 'react'
import { View, Text, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import Button from 'react-native-button'
import FastImage from 'react-native-fast-image'
import { Input as TextInput } from 'galio-framework'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Modal, Portal, Provider } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';

import Camera from '../../../components/Camera/Camera'
import PreviewVideo from '../../../components/Profile/PreviewVideo'
import Btn from '../../../components/Prebuilt/Button'
import { height, width } from '../../../constants'
import PreviewImage from '../../../components/Profile/PreviewImage'
import { firebase, useAuth, useStore } from '../../../utils'


const Tab = createMaterialBottomTabNavigator();


export function CreatePost({ navigation }) {
  const [captured, setCaptured] = React.useState(null)
  const [captureType, setCaptureType] = React.useState(null)
  const [captureMode, setCaptureMode] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [postCaption, setPostCaption] = React.useState('')
  const playerRef = React.useRef(null)
  const [authState] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { user, isAdmin } = storeState
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handlePostTask = () => {
    const details = {
      type: captureType,
      [captureType]: captured,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    }
    navigation.navigate('CreateCaption', {
      details, user
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
    handlePostTask()
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
        <PreviewImage
          captured={captured}
          onComplete={uri => console.log('[CROPIMAGE]', uri)}
        />}

      {captureType == 'video' &&
        <PreviewVideo
          source={captured}
          resetSource={() => setCaptured(null)}
        />}

      {!captured &&
        <View style={{ flex: 1 }}>
          <View style={{ flex: 11 }}>
            <Camera
              mode={isAdmin ? captureMode : 'image'}
              setCameraFlip={flip => setCameraFlip(flip)}
              dataUri={uri => setCaptured(uri)}
              dataType={type => setCaptureType(type)}
            />
          </View>

          {isAdmin &&
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

              <TouchableOpacity onPress={() => {
                ImagePicker.openPicker({
                  width: 1080,
                  height: 1080,
                  mediaType: 'any'
                }).then(image => {
                  console.log(image.path, image.mime)
                  setCaptured(image.path);
                  setCaptureMode(image.mime === 'video/mp4' ? 'video' : 'camera')
                  setCaptureType(image.mime === 'video/mp4' ? 'video' : 'image')
                });
              }}
                style={{ alignItems: 'center' }}>
                <MaterialCommunityIcons name="image-search-outline"
                  color={captureMode == 'video' ? 'white' : 'gray'}
                  size={26} />
                <Text style={{ color: captureMode == 'video' ? 'white' : 'gray' }}>Gallery</Text>
              </TouchableOpacity>
            </View>}

        </View>}


    </View>
  )
}