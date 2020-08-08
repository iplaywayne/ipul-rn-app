import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import {
  Block, Button, Card, Icon, Input, NavBar, Text as GalText,
  DeckSwiper
} from 'galio-framework';

import { useAuth } from '../../contexts/AuthContext'

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

function MiniCard() {
  const auth = useAuth()
  const [{ user }] = auth
  const { name, avatar, details } = user || 'N/A'

  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.miniCard}>
          <View style={styles.miniCardImage}>
            <Image
              source={require('../../assets/images/iPlay2020Logo.png')}
              style={{ height: '100%', width: '100%' }} resizeMode='cover' />
          </View>
          <View style={styles.miniCardText}>
            <GalText style={{ padding: 15 }}>Artist name</GalText>
          </View>
        </View>
      </ScrollView>
    </View>
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
    height: 150,
    width: 150,
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 10
  },
  miniCardImage: {
    flex: 3,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10

  },
  miniCardText: {
    flex: 1
  }
})

export default MiniCard
