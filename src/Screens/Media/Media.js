import React from 'react'
import {
  View, Button, SafeAreaView, ScrollView, StyleSheet, Image, ActivityIndicator,
  Dimensions, VirtualizedList, FlatList, TouchableOpacity, StatusBar
} from 'react-native'
import { CommonActions } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons'
import { Text } from 'galio-framework'
import { List, Divider, Searchbar } from 'react-native-paper';
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
  const { tracks, currentTrack, queued } = storeState
  const refRBSheet = React.useRef();
  const modalizeRef = React.useRef(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  if (!tracks.length) return <ActivityIndicator
    style={{ flex: 1, backgroundColor: '#121212' }} color='pink'
  />

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const MediaContent = () => (
    <View>
      {/* <View style={styles.handlerBar}></View> */}

      {'acid' in currentTrack &&
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

        {tracks && tracks.slice(0, 11).map((itm, idx) => (
          <TouchableOpacity key={idx} onPress={async e => {
            setTimeout(async () => {
              storeDispatch.setCurrentTrack(itm)
              await TrackPlayer.reset()
              await TrackPlayer.add({
                id: itm.acid,
                title: itm.title,
                artist: itm.artist,
                url: trimWWWString(itm.song),
                artwork: trimWWWString(itm.art_link)
              })
              await TrackPlayer.play()
            }, 500)
          }}>
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
              {/* <Image source={itm.art_link ? { uri: itm.art_link } : logo}
                style={{ height: 50, width: 50, margin: 10, borderRadius: 5 }}
                resizeMode='cover' /> */}
              <Text style={{ marginVertical: 10, marginRight: 5, fontWeight: '700' }}>{itm.artist}</Text>
              <Text style={{ marginVertical: 10 }}>{itm.title}</Text>
              <View style={{ flexDirection: 'row', position: 'absolute', right: 30 }}>
                <Button title='Play' />
              </View>
            </View>
            <Divider />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )

  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <View style={{ marginTop: 80, marginHorizontal: 30 }}>
        <Searchbar
          placeholder="Search"
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
