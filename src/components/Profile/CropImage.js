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
        width: 400,
        height: 400
      }).then(image => {
        setCroppedUri(image.path)
      }).catch(err => {
        console.log(err)
      })
    }
    return () => {
      ImagePicker.clean().then(() => {
        console.log('removed all tmp images from tmp directory');
      }).catch(e => {
      });
    }
  }, [])


  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Image source={{ uri: croppedUri }}
        style={{ height: 550, borderRadius: 0 }} />
    </View>
  )
}

export default CropImage
