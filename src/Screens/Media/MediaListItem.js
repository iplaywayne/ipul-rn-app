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


export const MediaListItem = ({ item, idx, addQueue, isLoading }) => (
  <TouchableOpacity key={idx} onPress={() => addQueue(item)}>
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
      <Text style={{ marginVertical: 10 }}>{item.title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <Button style={{ padding: 10, color: Colors.red500 }}
          onPress={() => addQueue(item)}>
          {isLoading ? <ActivityIndicator style={{ paddingLeft: 10 }} /> : 'Add'}
        </Button>
        {/* <Text>{currentTrack === itm ? 'true' : 'false'}</Text> */}
      </View>
    </View>
    <Divider />
  </TouchableOpacity>
)