import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet, Vibration } from 'react-native'
import {
  Block, Button, Card, Icon, Input, NavBar, Text as GalText,
  DeckSwiper
} from 'galio-framework';
import TouchableScale from 'react-native-touchable-scale'
import TrackPlayer from 'react-native-track-player'
import { IconButton, Colors } from 'react-native-paper';

import { useAuth, useStore } from '../../contexts'
import { siteLogo } from '../../constants'
import { firebase, database, auth, trimWWWString } from '../../utils'


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

function MiniCard({ item, addControl, removeControl }) {
  const auth = useAuth()
  const [storeState, storeDispatch] = useStore()
  const [{ user }] = auth
  const { avatar, details } = user ?? { avatar: '', details: {} }
  const { queued } = storeState

  if (!item) item = {}

  return (
    <TouchableScale onPress={() => {
      if (queued.includes(item)) {
        console.log('This track exits')
        return
      }
      storeDispatch.addToQueue(item)
    }}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'column' }}>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {addControl &&
            <IconButton
              icon="plus"
              color={Colors.red500}
              size={20}
              onPress={() => storeDispatch.addToQueue(item)}
            />}
          {removeControl &&
            <IconButton
              icon="minus"
              color={Colors.red500}
              size={20}
              onPress={() => storeDispatch.removeFromQueue(item)}
            />}
        </View>

        <View style={styles.miniCard}>
          <View style={styles.miniCardImage}>
            <Image
              source={{ uri: item.art_link || siteLogo }}
              style={{ height: '100%', width: '100%' }} resizeMode='cover' />
          </View>
          <View style={styles.miniCardText}>
            <GalText style={{ fontWeight: '700' }}>{item.artist}</GalText>
            <GalText>{item.title}</GalText>
          </View>
        </View>

      </ScrollView>
    </TouchableScale>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 10,
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
