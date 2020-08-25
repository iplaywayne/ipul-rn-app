import React from 'react'
import {
  View, Button as Btn, SafeAreaView, ScrollView, StyleSheet, Image as Img, ActivityIndicator,
  Dimensions, VirtualizedList, FlatList, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  HeaderSearchBar,
  HeaderClassicSearchBar
} from "react-native-header-search-bar";

import { SendPlayerDetails, TrackPlayerStructure } from '../../utils/media/functions'
import { MediaListItem } from './MediaListItem'
import { styles } from './styles'
import LocalAlert from '../../utils/notifs/LocalAlert'



function Media({ route, navigation }) {
  const [authState, authDispatch] = useAuth()
  const [storeState, storeDispatch] = useStore()
  const { isLoading, tracks, currentTrack, queued } = storeState
  const refRBSheet = React.useRef();
  const modalizeRef = React.useRef(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [trackQuery, setTrackQuery] = React.useState([])
  const tracksToDisplay = trackQuery.length ? trackQuery : []
  const [loading, setLoading] = React.useState(true)
  const { user } = authState

  const onChangeSearch = query => {
    setSearchQuery(query)
    setTrackQuery(tracks.filter(t => JSON.stringify(t).toLowerCase().includes(query.toLowerCase())))
  };

  const addQueue = async (item) => SendPlayerDetails(item, storeDispatch)

  const handleListTapped = async (item) => addQueue(item)

  const handleNavigateDetails = itm => {
    TrackPlayer.add(TrackPlayerStructure(itm))
    storeDispatch.addToQueue(itm)
    LocalAlert('Media Queue', `${itm.title} by ${itm.artist} added to your Queue`)
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: props => (<HeaderSearchBar
        firstTitle={'Find something new'}
        secondTitle={'on iPlayuListen'}
        onChangeText={onChangeSearch}
        onPressHamburgerIcon={() => navigation.toggleDrawer()}
      />),
    })
  }, [route])

  React.useEffect(() => {
    if (!searchQuery) setTrackQuery(tracks)
  }, [])

  React.useEffect(() => {
    setTimeout(() => {
      if (tracks.length) {
        setLoading(false)
      }
    }, 500)
  }, [])


  if (loading) return <Center><Spinner type='Wave' /></Center>


  const MediaContent = () => (
    <View>
      {(currentTrack || {})?.acid && !searchQuery &&
        <View style={{ alignItems: 'center', marginBottom: -10 }}>
          <FastImage source={currentTrack?.art_link ? { uri: currentTrack?.art_link } : logo}
            style={{ flex: 0, height: 200, width: 200, marginTop: 20, marginBottom: 20, borderRadius: 5 }}
            resizeMode='cover' />
          {currentTrack?.acid && <Text>
            <Text style={{ fontWeight: '700' }}>{currentTrack?.artist}</Text> <Text>{currentTrack?.title}</Text>
          </Text>}
        </View>}

      <ScrollView style={{ height: 'auto', marginTop: 15 }}
        showsVerticalScrollIndicator={false}>
        {tracksToDisplay.length ? tracksToDisplay.slice(0, 17).map((itm, idx) => (
          <MediaListItem
            key={itm.acid}
            item={itm}
            addQueue={handleNavigateDetails}
            // isLoading={isLoading}
            currentTrack={currentTrack}
          />
        )) :
          <View style={{
            flex: 1, justifyContent: 'center',
            alignItems: 'center', marginTop: 10
          }}><Text style={{ fontWeight: '700' }}>nothing found. should we add this?</Text></View>}
      </ScrollView>
    </View>
  )

  return (
    <KeyboardAwareScrollView
      style={{ height: 1000 }}
      showsVerticalScrollIndicator={false}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >

      <View>
        {(currentTrack || {}).acid && !searchQuery &&
          <View style={{ alignItems: 'center', marginBottom: -10 }}>
            <FastImage source={(currentTrack || {}).art_link ? { uri: (currentTrack || {}).art_link } : logo}
              style={{ flex: 0, height: 200, width: 200, marginTop: 20, marginBottom: 20, borderRadius: 5 }}
              resizeMode='cover' />
            {currentTrack && <View style={{ flexDirection: 'row', marginBottom: 15 }}>
              <Text style={{ fontWeight: '700' }}>{(currentTrack || {}).artist}</Text>
              <Text style={{ marginLeft: 5 }}>{(currentTrack || {}).title}</Text>
            </View>}
          </View>}

        <ScrollView style={{ height: 'auto', marginTop: 15 }}
          showsVerticalScrollIndicator={false}>
          {tracksToDisplay.length ? tracksToDisplay.slice(0, 17).map((itm, idx) => (
            <MediaListItem
              key={itm.acid}
              item={itm}
              addQueue={() => handleNavigateDetails(itm)}
              isLoading={isLoading}
              currentTrack={currentTrack}
            />
          )) :
            <View style={{
              flex: 1, justifyContent: 'center',
              alignItems: 'center', marginTop: 10
            }}><Text style={{ fontWeight: '700' }}>nothing found. should we add this?</Text></View>}
        </ScrollView>
      </View>

    </KeyboardAwareScrollView>
  )
}



export default Media
