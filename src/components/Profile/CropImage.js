import React from 'react'
import { View, Text, Image } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import Button from 'react-native-button'

import { height, width } from '../../constants'


function CropImage(props) {
  const [croppedUri, setCroppedUri] = React.useState('file:///var/mobile/Containers/Data/Application/AC3D50E1-167F-4ADA-B3DC-1E8728929EFE/Library/Caches/Camera/D122703E-A25A-4425-A5F6-DCCA28181057.jpg')


  // React.useLayoutEffect(() => {
  //   if (!croppedUri) {
  //     ImagePicker.openCropper({
  //       path: props.captured,
  //       width: 720,
  //       height: 1080
  //     }).then(image => {
  //       setCroppedUri(image.path)
  //     });
  //   }
  //   return () => {
  //     ImagePicker.clean().then(() => {
  //       console.log('removed all tmp images from tmp directory');
  //     }).catch(e => {
  //     });
  //   }
  // }, [])


  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: croppedUri }}
        style={{ height: 550, borderRadius: 0 }} />
    </View>
  )
}

export default CropImage
