import React from 'react'
import { View, Text, Image } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import Button from 'react-native-button'

import { height, width } from '../../constants'


function CropImage(props) {
  const [croppedUri, setCroppedUri] = React.useState(null)


  React.useLayoutEffect(() => {
    if (!croppedUri) {
      ImagePicker.openCropper({
        path: props.captured,
        width: 720,
        height: 1080
      }).then(image => {
        setCroppedUri(image.path)
      });
    }
    return () => {
      ImagePicker.clean().then(() => {
        console.log('removed all tmp images from tmp directory');
      }).catch(e => {
      });
    }
  }, [])


  return (
    <View style={{ flex: 1, backgroundColor: '#121212',justifyContent:'center' }}>
      <Image source={{ uri: croppedUri }} style={{ height: 560, borderRadius: 5 }} />
    </View>
  )
}

export default CropImage
