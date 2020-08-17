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
import { Divider, Snackbar } from 'react-native-paper'

import { useAuth, useStore } from '../../contexts'
import { logo, siteLogo } from '../../constants'
import { firebase, database, auth, truncate, trimWWWString } from '../../utils'
import { SendPlayerDetails } from '../../utils/media/functions'
import MediaService from '../../utils/media/MediaService'


const elements = [
  <View style={{ backgroundColor: '#B23AFC', height: 250, width: 250 }}>
    <Text>You wanna see a cool component?</Text>
    <Text>Galio has this cool Deck Swiper</Text>
  </View>,
  <View style={{ backgroundColor: '#FE2472', height: 250, width: 250 }}>
    <Text>What did you expect?</Text>
    <Text>This React Native component works perfectly</Text>
  </View>,
  <View style={{ backgroundColor: '#FF9C09', height: 250, width: 250 }}>
    <Text>Maybe you want to build the next Tinder</Text>
  </View>,
  <View style={{ backgroundColor: '#45DF31', height: 250, width: 250 }}>
    <Text>or maybe you just want a nice deck swiper component</Text>
    <Text>Galio has everything sorted out for you</Text>
  </View>
]

const Swiper = () => (
  <View style={{ flex: 1 }}>
    <Block>
      <DeckSwiper components={elements} />
    </Block>
  </View>
)

function MiniCard({ idx, item, addControl, removeControl }) {
  const auth = useAuth()
  const [storeState, storeDispatch] = useStore()
  const [{ user }] = auth
  const { avatar, details } = user ?? { avatar: '', details: {} }
  const { queued, tracks, isPlaying, currentTrack } = storeState
  const [isAlert, setIsAlert] = React.useState()
  const [alertMessage, setAlertMessage] = React.useState({
    visible: false, message: 'Test'
  })

  if (!item) item = {}
  let newItem = { ...item, id: item.acid }

  const addQueue = async () => {
    if (removeControl) return
    setTimeout(() => storeDispatch.setLoading(true), 250)
    setTimeout(async () => {
      if (idx < 0) {
        console.log('Missing media index', item.title, idx)
        return
      }
      SendPlayerDetails(item, storeDispatch)
    }, 250)
  }

  const removeQueue = async () => {
    setTimeout(() => storeDispatch.setLoading(true), 250)
    setTimeout(async () => {
      await storeDispatch.removeFromQueue(item)
    }, 500)
  }

  return (
    <TouchableScale onPress={addQueue}>
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

      <Snackbar
        visible={alertMessage.visible}
        duration={3000}
        onDismiss={() => alertMessage({ visible: false })}
        action={{
          label: 'OK',
          onPress: () => {
            () => alertMessage({ visible: false })
          },
        }}>
        {alertMessage.message}
      </Snackbar>

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
