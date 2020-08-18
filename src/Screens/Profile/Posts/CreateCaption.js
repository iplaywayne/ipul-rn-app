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
import { ErrorBoundary } from '../../../components'
import PendingPost from '../../../screens/Profile/Posts/PendingPost'




export const CreateCaption = ({ route, navigation }) => {
  const [loading, setLoading] = React.useState(false)
  const { user, details } = route.params

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
          // disabled={!captured || !captureMode}
          // onPress={handlePostTask}
          >
            {loading ? <ActivityIndicator /> : 'Done'}
          </Button>
        </View>
      ),
    })
  }, [])


  return (
    <View style={{ flex: 1 }}>
      <ErrorBoundary caller='Profile Pending Post'>
        <PendingPost
          user={user}
        postDetails={details}
        onChange={val => console.log(val)}
        onComplete={() => console.log(null)}
        />
      </ErrorBoundary>
    </View>
  )
}