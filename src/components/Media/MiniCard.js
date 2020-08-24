import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Vibration } from 'react-native'
import {
  Block, Button, Card, Icon, Input, NavBar, Text as GalText,
  DeckSwiper
} from 'galio-framework';
import TouchableScale from 'react-native-touchable-scale'
import TrackPlayer from 'react-native-track-player'
import { IconButton, Colors } from 'react-native-paper';
import FastImage from 'react-native-fast-image'
import { v4 as uuidv4 } from 'uuid';
import { Divider } from 'react-native-paper'
import Snackbar from 'react-native-snackbar'
import { useNavigation } from '@react-navigation/native';

import { useAuth, useStore } from '../../contexts'
import { logo, siteLogo } from '../../constants'
import { firebase, database, auth, truncate, trimWWWString } from '../../utils'
import { SendPlayerDetails } from '../../utils/media/functions'
import MediaService from '../../utils/media/MediaService'
import LocalAlert from '../../utils/notifs/LocalAlert'


function MiniCard({ idx, item, addControl, removeControl }) {
  const auth = useAuth()
  const [storeState, storeDispatch] = useStore()
  const [{ user }] = auth
  const { avatar, details } = user ?? { avatar: '', details: {} }
  const { queued, tracks, isPlaying, currentTrack } = storeState
  const [isAlert, setIsAlert] = React.useState()
  const navigation = useNavigation()

  if (!item) item = {}
  let newItem = { ...item, id: item.acid }

  const onPress = async () => {
    if (removeControl) return
    setTimeout(() => {
      navigation.navigate('MediaDetails', {
        item, user, tracks
      })
    }, 250)
  }

  const removeQueue = async () => {
    setTimeout(async () => {
      await storeDispatch.removeFromQueue(item)
      LocalAlert('Media Queue', `${item.title} has been removed from your Queue`)
    }, 500)
  }

  return (
    <TouchableScale onPress={onPress}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'column' }}>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginLeft: 10
        }}>
          {removeControl &&
            <TouchableScale onPress={removeQueue}>
              <Text style={{ margin: 5, color: Colors.red500 }}>Remove</Text>
            </TouchableScale>}
        </View>

        <View style={styles.miniCard}>
          <View style={styles.miniCardImage}>
            <FastImage
              style={{ width: '100%', height: '100%' }}
              source={{
                uri: item.art_link ? item.art_link : item.artwork || siteLogo,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={styles.miniCardText}>
            <GalText style={{ fontWeight: '700' }}>{truncate(item.artist, 20)}</GalText>
            <GalText>{truncate(item.title, 20)}</GalText>
          </View>
        </View>

      </ScrollView>

      {/* <Text>{JSON.stringify(alertMessage, null, 2)}</Text> */}
    </TouchableScale>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: 320,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20
  },
  miniCard: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 175,
    width: 175,
    // marginTop: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  miniCardImage: {
    flex: 3,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10

  },
  miniCardText: {
    flex: 1,
    paddingTop: 7,
    paddingLeft: 7,
  }
})

export default MiniCard
