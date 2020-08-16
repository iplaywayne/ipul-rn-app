import React from 'react'
import {
  SafeAreaView, Text, StatusBar, StyleSheet, ScrollView, View, TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'
import Video from 'react-native-video';
import { Input as TextInput } from 'galio-framework'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';


import Button from '../Prebuilt/Button'
import { height, width } from '../../constants'

function VideoPlayer({ source, resetSource }) {
  const playerRef = React.useRef(null)
  const [onBuffer, setOnBuffer] = React.useState(null)
  const [onVideoError, setOnVideoError] = React.useState(null)

  return (
    <>
      <Video
        source={{ uri: source }}   // Can be a URL or a local file.
        ref={ref => playerRef.current = ref}                                     // Store reference
        onBuffer={setOnBuffer}                // Callback when remote video is buffering
        onError={setOnVideoError}               // Callback when video cannot be loaded
        style={styles.backgroundVideo}
        repeat={true}
        volume={1}
      />
      <TouchableOpacity onPress={() => playerRef.current.seek(0)}
        style={{ position: 'absolute', top: 50, left: 30, zIndex: 10 }}>
        <Icons name='repeat' size={35} style={{ color: 'white' }} />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  backgroundVideo: {
    height: 550,
  }
});

export default VideoPlayer
