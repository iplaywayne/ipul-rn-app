import React from 'react'
import { View, Text, ScrollView, Image as Img, StyleSheet, TouchableOpacity } from 'react-native'
import {
  Block, Button as Btn, Card, Icon, Input, NavBar, Text as GalText,
  DeckSwiper
} from 'galio-framework';
// import { Divider } from 'react-native-paper'
// import Divider from 'react-native-divider'
import Divider from '../Prebuilt/Divider'
import { FastImage as Image } from 'react-native-fast-image'
import Button from 'react-native-button'
import { Shadow } from 'react-native-neomorph-shadows';

import { useAuth } from '../../contexts/AuthContext'
import { trimWWWString, truncate } from '../../utils'
import { siteLogo } from '../../constants'

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

function SponsoredCard(props) {
  const { title, caption, location, avatar, image, item, onOpen } = props
  const [authState, authDispatch] = useAuth()
  const { user } = authState
  // const { name, avatar, details } = user ?? { name: '', avatar: '', details: '' }


  return (
    <Shadow
      useArt // <- set this prop to use non-native shadow on ios
      style={{
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowColor: "grey",
        shadowRadius: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        width: 400,
        height: 475,
      }}
    >
      <ScrollView style={styles.root}>
        <TouchableOpacity>
          <View>
            <Text style={{ paddingLeft: 10, paddingBottom: 20, fontWeight: '700' }}>
              Sponsored
            </Text>
            <Card
              flex
              borderless
              shadow={true}
              title={title}
              caption={caption}
              location={truncate(location,18)}
              avatar={avatar}
              imageStyle={{ borderRadius: 10, height: 300 }}
              image={image}
            />
            <Divider orientation="center" >Shop</Divider>
            <Button style={{ fontSize: 15, marginTop: 15, marginBottom: 15 }}
              onPress={() => onOpen()}>Shop Now</Button>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Shadow >
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 5,
    marginTop: 20,
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

export default SponsoredCard
