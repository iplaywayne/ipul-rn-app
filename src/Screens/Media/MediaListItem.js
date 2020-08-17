import React from 'react'
import {
  View, Button as Btn, SafeAreaView, ScrollView, StyleSheet, Image as Img, ActivityIndicator,
  Dimensions, VirtualizedList, FlatList, TouchableOpacity, StatusBar
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { Text } from 'galio-framework'
import Button from 'react-native-button'
import { List, Divider, Searchbar, Colors } from 'react-native-paper';

import { siteLogo, logo, width, height } from '../../constants'
import { truncate } from '../../utils'


export const MediaListItem = ({ currentTrack, item, idx, addQueue, isLoading }) => {
  const [loading, setLoading] = React.useState(false)

  const handleAddQueue = () => {
    setLoading(true)
    setTimeout(() => {
      addQueue(item)
      setLoading(false)
    }, 1000)
  }

  return (
    <TouchableOpacity key={idx} onPress={() => handleAddQueue(item)}>
      <Divider />

      <View
        style={{ flexDirection: 'row', marginVertical: 0, alignItems: 'center' }}>
        <FastImage
          style={{ height: 50, width: 50, margin: 10, borderRadius: 5 }}
          source={{
            uri: item.art_link || siteLogo,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={{ marginVertical: 10, marginRight: 5, fontWeight: '700' }}>{item.artist}</Text>
        <Text style={{ marginVertical: 10 }}>{truncate(item.title, 25)}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          {currentTrack !== item &&
            <Button style={{ fontSize: 15, padding: 10, color: Colors.red500 }}
              onPress={() => handleAddQueue(item)}>
              {loading ? <ActivityIndicator style={{ paddingLeft: 10 }} /> : 'Add'}
            </Button>}
        </View>
      </View>
      {currentTrack === item ?
        <View style={{
          flex: 1, justifyContent: 'center', alignItems: 'center',
          paddingBottom: 10
        }}>
          <Text style={{ fontWeight: '700', color: Colors.red500 }}>Now Queued</Text></View> : null}
    </TouchableOpacity>
  )
}