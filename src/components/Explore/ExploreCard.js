import React from 'react'
import { View, Text, ScrollView, Image as Img, StyleSheet, TouchableOpacity } from 'react-native'
import {
  Block, Button, Card, Icon, Input, NavBar, Text as GalText,
  DeckSwiper
} from 'galio-framework';
import { Divider } from 'react-native-paper'
import { FastImage as Image } from 'react-native-fast-image'
import DoubleClick from 'react-native-double-tap'

import { useAuth, useStore, trimWWWString } from '../../utils'
import { siteLogo } from '../../constants'
import MediaService from '../../utils/media/MediaService'
import { firebase, database } from '../../utils'


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

function ExploreCard(props) {
  const { item, navigation } = props
  const [authState, authDispatch] = useAuth()
  const { user } = authState
  const [storeState] = useStore()
  const { name, avatar, details, tracks } = storeState
  const mediaService = MediaService()


  const handleMediaView = () => {
    navigation.navigate('MediaDetails', {
      item: item,
      user: user,
      tracks: tracks
    })

    setTimeout(() => {
      const userRef = database.ref(`channels/media/${item.acid}`)
      userRef.update({ views: firebase.database.ServerValue.increment(1) })
    }, 250)
  }


  return (
    <ScrollView style={styles.root}>
      <DoubleClick
        doubleTap={handleMediaView}
      >

        <View>
          <Card
            flex
            borderless
            shadow={true}
            title={item && item.title || 'n/a'}
            caption={item && item.artist || '6 mo'}
            location={item && item.genre || 'n/a'}
            avatar={item && item.art_link || siteLogo}
            imageStyle={{ borderRadius: 10, height: 300 }}
            image={item && item.art_link || siteLogo}
            children={<View style={{
              marginHorizontal: 70, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between'
            }}>
              {item.views && <Text><Text style={{ fontWeight: '700' }}>Views</Text> {item.views}</Text>}
              {item.plays && <Text><Text style={{ fontWeight: '700' }}>Plays</Text> {item.plays}</Text>}
              {item.likes && <Text><Text style={{ fontWeight: '700' }}>Likes</Text> {item.likes}</Text>}
            </View>}
          />
          <Divider />
        </View>

      </DoubleClick>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 5,
    marginTop: 10,
    width: '100%',
    maxWidth: 500,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20
  },
  miniCard: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 200,
    width: 200,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 5,
    paddingBottom: 50,

  },
  miniCardImage: {
    flex: 3,
    overflow: 'hidden',
  },
  miniCardText: {
    flex: 1
  }
})

export default ExploreCard
