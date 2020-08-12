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
import { Modalize } from 'react-native-modalize';
import BottomSheet from 'react-native-simple-bottom-sheet';
import { BottomSheet as BSheet } from 'reanimated-bottom-sheet'
import RBSheet from "react-native-raw-bottom-sheet";
import FastImage from 'react-native-fast-image'
import TrackPlayer from 'react-native-track-player'
import Button from 'react-native-button'
import Spinner from 'react-native-spinkit'

import { SendPlayerDetails } from '../../utils/media/functions'

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
      // tracks.filter(t => t.title.toString().toLowerCase().includes(query.toLowerCase())) ||
      tracks.filter(t => t.genre.toString().toLowerCase().includes(query.toLowerCase())) ||
      tracks.filter(t => t.bio.toString().toLowerCase().includes(query.toLowerCase()))
    )
  };

  const addQueue = async (item) => {
    SendPlayerDetails(item, storeDispatch)
    setTimeout(() => storeDispatch.setLoading(true), 250)
  }

  const handleListTapped = async (item) => {
    addQueue(item)
  }

  React.useEffect(() => {
    storeDispatch.setLoading(false)
  }, [])

  if (!tracks.length) return <ActivityIndicator
    style={{ flex: 1, backgroundColor: '#121212' }} color='pink'
  />

  const MediaContent = () => (
    <View>
      {'acid' in currentTrack && !searchQuery &&
        <View style={{ alignItems: 'center', marginBottom: -25 }}>
          <FastImage source={currentTrack.art_link ? { uri: currentTrack.art_link } : logo}
            style={{ flex: 0, height: 200, width: 200, marginTop: 20, marginBottom: 20, borderRadius: 5 }}
            resizeMode='cover' />
          {currentTrack && <Text>
            <Text style={{ fontWeight: '700' }}>{currentTrack.artist}</Text> <Text>{currentTrack.title}</Text>
          </Text>}
        </View>}

      <ScrollView style={{ height: 'auto', marginTop: 40, marginBottom: 25 }}
        showsVerticalScrollIndicator={false}>

        {tracksToDisplay && tracksToDisplay.slice(0, 11).map((itm, idx) => (
          <TouchableOpacity key={idx} onPress={() => handleListTapped(itm)}>
            <View
              style={{ flexDirection: 'row', marginVertical: 0, alignItems: 'center' }}>
              <FastImage
                style={{ height: 50, width: 50, margin: 10, borderRadius: 5 }}
                source={{
                  uri: itm.art_link || siteLogo,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={{ marginVertical: 10, marginRight: 5, fontWeight: '700' }}>{itm.artist}</Text>
              <Text style={{ marginVertical: 10 }}>{itm.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Button style={{ padding: 10, color: Colors.red500 }}
                  onPress={() => addQueue(itm)}>
                  {isLoading ? <ActivityIndicator style={{ paddingLeft: 10 }} /> : 'Add'}
                </Button>
                {/* <Text>{currentTrack === itm ? 'true' : 'false'}</Text> */}
              </View>
            </View>
            <Divider />
          </TouchableOpacity>
        ))}
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  logo: {
    borderRadius: 30,
    height: height * .4,
    width: width,
  },
  title:
  {
    zIndex: 1, top: 100, fontWeight: '700', color: 'white',
    position: 'absolute', left: 30
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 120,
    paddingHorizontal: 30,
    height: height - 200,
    marginTop: -40
  },
  miniCard: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 200,
    width: 200,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 5
  },
  miniCardImage: {
    flex: 3,
    overflow: 'hidden',
  },
  miniCardText: {
    flex: 1
  },
  sheetHeader: {
    backgroundColor: '#fff',
    height: 100,
  },
  sheetContent: {
    backgroundColor: '#121212',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: -100,
    height: 700,
  },
  handlerBar: {
    position: 'absolute',
    backgroundColor: '#D1D1D6',
    top: 10,
    borderRadius: 3,
    height: 5,
    width: 30,
    flex: 1,
  },
})


export default Explore
