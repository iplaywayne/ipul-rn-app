import React from 'react'
import { ScrollView, View, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import Button from 'react-native-button'
import { CommonActions } from '@react-navigation/native';
import { Avatar, Divider, Text, TextInput } from 'react-native-paper';
import Animated from 'react-native-reanimated'
import ImagePicker from 'react-native-image-picker';


import { Center } from '../../components'
import { useAuth, useStore, wait } from '../../utils'
import Btn from '../../components/Prebuilt/Button'


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

  const [formState, setFormState] = React.useState({
    name: name,
    bio: bio,
    occupation: occupation
  })

  const handleSelectImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }
  const handleGoBack = async () => {
    await wait(() => setLoading(true))
    await wait(() => setLoading(false), 750)
    navigation.goBack()
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
        <Button style={{ marginRight: 20 }} onPress={handleGoBack}>
          {loading ? <ActivityIndicator style={{ marginRight: 30 }} /> : 'Done'}
        </Button>
      )
    })
  }, [loading])



  return (
    <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}
    >

      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <TouchableOpacity onPress={handleSelectImage}>
          {/* <Image source={avatar ? { uri: avatar } : require('../../assets/images/iPlay2020Logo.png')}
          style={{ height: 100, width: 100, borderRadius: 100 / 2 }} /> */}
          {avatar ?
            <Image source={{ uri: avatar }}
              style={{ height: 100, width: 100, borderRadius: 100 / 2 }} />
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
