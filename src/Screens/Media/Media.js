import React from 'react'
import {
  View, Button as Btn, SafeAreaView, ScrollView, StyleSheet, Image as Img, ActivityIndicator,
  Dimensions, VirtualizedList, FlatList, TouchableOpacity, StatusBar
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Text } from 'galio-framework'
import { List, Divider, Searchbar, Colors } from 'react-native-paper';
import { firebase, database, MediaService } from '../../utils'
import { Center, MiniCard } from '../../components'
import { useAuth, useStore } from '../../contexts'
import { siteLogo, logo, width, height } from '../../constants'
import BottomSheet from 'react-native-simple-bottom-sheet';
import { BottomSheet as BSheet } from 'reanimated-bottom-sheet'
import RBSheet from "react-native-raw-bottom-sheet";
import FastImage from 'react-native-fast-image'
import TrackPlayer from 'react-native-track-player'
import Button from 'react-native-button'
import Spinner from 'react-native-spinkit'

import { SendPlayerDetails } from '../../utils/media/functions'
import { MediaListItem } from './MediaListItem'
import { styles } from './styles'



const DATA = [];
const getItem = (data, index) => {
  return {
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`
  }
}
const getItemCount = (data) => {
  return 50;
}
const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text style={{ color: 'white', marginVertical: 5 }}>{title}</Text>
    </View>
  );
}



function Explore() {
  const [authState, authDispatch] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { isLoading, tracks, currentTrack, queued } = storeState
  const refRBSheet = React.useRef();
  const modalizeRef = React.useRef(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [trackQuery, setTrackQuery] = React.useState([])
  const tracksToDisplay = trackQuery.length ? trackQuery : []

  const onChangeSearch = query => {
    setSearchQuery(query)
    setTrackQuery(
      tracks.filter(t => t.artist.toString().toLowerCase().includes(query.toLowerCase())) ||
      tracks.filter(t => t.title.toString().toLowerCase().includes(query.toLowerCase())) ||
      tracks.filter(t => t.genre.toString().toLowerCase().includes(query.toLowerCase())) ||
      tracks.filter(t => t.bio.toString().toLowerCase().includes(query.toLowerCase()))
    )
  };

  const addQueue = async (item) => {
    setTimeout(() => storeDispatch.setLoading(true), 250)
    SendPlayerDetails(item, storeDispatch)
  }

  const handleListTapped = async (item) => {
    addQueue(item)
  }

  React.useEffect(() => {
    storeDispatch.setLoading(false)
    if (!searchQuery) {
      setTrackQuery(tracks)
    }
  }, [])

  if (!tracks.length) return <ActivityIndicator
    style={{ flex: 1, backgroundColor: '#121212' }} color='pink'
  />

  const MediaContent = () => (
    <View>
      {'acid' in currentTrack && !searchQuery &&
        <View style={{ alignItems: 'center', marginBottom: -10 }}>
          <FastImage source={currentTrack.art_link ? { uri: currentTrack.art_link } : logo}
            style={{ flex: 0, height: 200, width: 200, marginTop: 20, marginBottom: 20, borderRadius: 5 }}
            resizeMode='cover' />
          {currentTrack && <Text>
            <Text style={{ fontWeight: '700' }}>{currentTrack.artist}</Text> <Text>{currentTrack.title}</Text>
          </Text>}
        </View>}

      <ScrollView style={{ height: 'auto', marginTop: 30, marginBottom: 25 }}
        showsVerticalScrollIndicator={false}>
        {tracksToDisplay.length ? tracksToDisplay.slice(0, 11).map((itm, idx) => (
          <MediaListItem
            key={idx}
            item={itm}
            addQueue={item => addQueue(item)}
            isLoading={isLoading}
            currentTrack={currentTrack}
          />
        )) :
          <View style={{
            flex: 1, justifyContent: 'center',
            alignItems: 'center'
          }}><Text style={{ fontWeight: '700' }}>nothing found. should we add this?</Text></View>}
      </ScrollView>
    </View >
  )

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <View style={{ marginTop: 70, marginHorizontal: 30 }}>
        <Searchbar
          placeholder="Search iPlayuListen"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <MediaContent />
    </ScrollView>
  )
}



export default Explore
