import React from 'react'
import { ScrollView, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
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


const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

function UpdateProfile({ navigation }) {
  const [authState] = useAuth()
  const [storeState] = useStore()
  const [loading, setLoading] = React.useState(false)
  const { user } = authState
  const { name, avatar, bio, occupation } = user && user
  const [capturedImage, setCapturedImage] = React.useState(null)

  const [formState, setFormState] = React.useState({
    name: name,
    bio: bio,
    occupation: occupation
  })

  const handleSelectImage = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      setCapturedImage(image.path)
      console.log(formState)
    });
  }

  const handleGoBack = async () => {
    await wait(() => setLoading(true))
    await wait(() => setLoading(false), 750)
  }

  const handleCancel = async () => {
    navigation.goBack()
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button style={{ marginLeft: 20 }} onPress={handleCancel}>
          {'Cancel'}
        </Button>
      ),
      headerRight: () => (
        <Button disabled={!capturedImage}
          style={{ marginRight: 20 }} onPress={handleGoBack}>
          {loading ? <ActivityIndicator style={{ marginRight: 30 }} /> : 'Done'}
        </Button>
      )
    })
  }, [loading, capturedImage])



  return (
    <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}
    >

      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <TouchableOpacity onPress={handleSelectImage}>
          {avatar || capturedImage ?
            <Image source={capturedImage ? { uri: capturedImage } : { uri: avatar }}
              style={{ height: 200, width: 200, borderRadius: 200 / 2 }} />
            :
            <Avatar.Text size={100} label={'iP'}
              style={{ backgroundColor: '#444' }} />}
        </TouchableOpacity>

        <Btn onPress={handleSelectImage}
          title='Select' containerStyle={{ marginTop: 10 }} />
      </View>

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

      <TextInput
        label="Occupation"
        value={formState.occupation}
        onChangeText={val => setFormState(state => ({
          ...formState,
          occupation: val
        }))}
        type='outlined'
      />

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
export default UpdateProfile
