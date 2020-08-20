import React from 'react'
import { View, Text, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import Button from 'react-native-button'
import FastImage from 'react-native-fast-image'
import { Input as TextInput } from 'galio-framework'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Modal, Portal, Provider } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

import Camera from '../../../components/Camera/Camera'
import PreviewVideo from '../../../components/Profile/PreviewVideo'
import Btn from '../../../components/Prebuilt/Button'
import { height, width } from '../../../constants'
import PreviewImage from '../../../components/Profile/PreviewImage'
import { firebase, useAuth, useStore } from '../../../utils'
import { ErrorBoundary } from '../../../components'
import PendingPost from '../../../screens/Profile/Posts/PendingPost'




export const CreateCaption = ({ route, navigation }) => {
  const [loading, setLoading] = React.useState(false)
  const [caption, setCaption] = React.useState('')
  const { user, details } = route.params

  const handlePostTask = () => {
    navigation.goBack()
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <Button style={{ marginLeft: 20 }} onPress={() => {
          navigation.goBack()
        }}>
          Back
        </Button>
      ),
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Button
            disabled={!caption}
            onPress={handlePostTask}
          >
            {loading ? <ActivityIndicator /> : 'Done'}
          </Button>
        </View>
      ),
    })
  }, [])


  return (
    <View style={{ flex: 1 }}>
      <ErrorBoundary caller='Create Caption'>
        <PendingPost
          user={user}
          postDetails={{ ...details, caption }}
          onChange={e => setCaption(e.nativeEvent.text)}
          onComplete={() => navigation.navigate('Profile')}
        />
      </ErrorBoundary>
    </View>
  )
}