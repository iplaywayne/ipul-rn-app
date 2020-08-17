import React from 'react'
import {
  ScrollView, View, Alert, ActivityIndicator, Image, TouchableOpacity,
  KeyboardAvoidingView, Keyboard
} from 'react-native'
import Button from 'react-native-button'
import { CommonActions } from '@react-navigation/native';
import { Avatar, Divider, Text, TextInput } from 'react-native-paper';
import Animated from 'react-native-reanimated'
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';


import { Center } from '../../components'
import { useAuth, useStore, wait } from '../../utils'
import Btn from '../../components/Prebuilt/Button'
import CropImage from '../../components/Profile/CropImage'
import { ProfileService } from '../../utils/profile'



function UpdateProfile({ navigation }) {
  const [authState] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const [loading, setLoading] = React.useState(false)
  const { user } = authState
  const { name, avatar, bio, occupation } = user && user
  const [capturedImage, setCapturedImage] = React.useState(null)
  const profileService = ProfileService()

  const [formState, formDispatch] = React.useReducer((state, action) => {
    console.log(state)
    switch (action.type) {
      case 'SET_NAME':
        return { ...state, name: action.val }
      case 'SET_BIO':
        return { ...state, bio: action.val }
      case 'SET_OCCUPATION':
        console.log('changing occ!', state)
        return { ...state, occupation: action.val }
      default:
        return state
    }
  }, {
    uid: user.uid,
    name: user.name,
    bio: user.bio,
    occupation: user.occupation,
  })


  React.useEffect(() => {
    return () => {
      if (capturedImage) {
        ImagePicker.clean().then(() => {
          console.log('Image cache cleared');
        }).catch(e => {
        });
      }
    }
  }, [])


  const handleDone = async (state) => {
    try {
      await wait(() => setLoading(true), 500)
      profileService.putAvatarImage(state, capturedImage,
        progress => console.log('PROGRESS', progress),
        next => {
          let result = {
            ...user,
            name: next.name,
            bio: next.bio,
            occupation: next.occupation
          }
          storeDispatch.setUser(result)
          navigation.goBack()
        })

    } catch (e) {
      console.log('We could not save your image', e)
    } finally {
      await wait(() => setLoading(false))
    }
  }


  const handleSelectImage = () => {
    try {
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
      }).then(image => {
        console.log(formState)
        setCapturedImage(image.path)
      });
    } catch (e) {
      console.log('Caught an error by handleSelectImage')
    }
  }

  const handleGoBack = async () => {
    await wait(() => setLoading(true))
    await wait(() => setLoading(false), 750)
  }

  const handleCancel = async () => {
    navigation.goBack()
  }


  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button style={{ marginLeft: 20 }} onPress={handleCancel}>
          {'Cancel'}
        </Button>
      ),
      headerRight: () => (
        <Button
          // disabled={!capturedImage}
          style={{ marginRight: 20 }} onPress={() => handleDone(formState)}>
          {loading ? <ActivityIndicator style={{ marginRight: 30 }} /> : 'Done'}
        </Button>
      )
    })
  }, [loading, capturedImage, formState])


  const handleUpdateSubmit = e => {
    console.log(e)
  }

  React.useEffect(() => {
    console.log(navigation)
  }, [navigation])


  return (
    <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>

      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <TouchableOpacity onPress={handleSelectImage}>
          {avatar || capturedImage ?
            <Image source={capturedImage ? { uri: capturedImage } : { uri: avatar }}
              style={{ height: 150, width: 150, borderRadius: 150 / 2 }} />
            :
            <Avatar.Text size={150} label={'iP'}
              style={{ backgroundColor: '#444' }} />}
        </TouchableOpacity>

        <Btn onPress={handleSelectImage}
          title='Select' containerStyle={{ marginTop: 10 }} />
      </View>

      <TextInput
        // disabled
        label="Username"
        value={formState.name}
        onChangeText={val => formDispatch({ type: 'SET_NAME', val: val })}
        type='outlined'
        onBlur={Keyboard.dismiss}
      />

      <TextInput
        // disabled
        label="Occupation"
        value={formState.occupation}
        onChangeText={val => formDispatch({ type: 'SET_OCCUPATION', val: val })}
        type='outlined'
        onBlur={Keyboard.dismiss}
      />

      <TextInput
        label="Bio"
        value={formState.bio}
        onChangeText={val => formDispatch({ type: 'SET_BIO', val: val })}
        type='outlined'
        multiline={true}
        height={120}
        onBlur={Keyboard.dismiss}
      />

      <Button type='submit' title='Submit' />

      {/* <Text>{JSON.stringify(user.occupation, null, 2)}</Text>
      <Text>{JSON.stringify(formState.occupation, null, 2)}</Text> */}
    </ScrollView>
  )
}

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

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
