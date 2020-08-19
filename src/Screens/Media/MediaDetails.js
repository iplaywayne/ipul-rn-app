import React from 'react'
import {
  ScrollView, View, Text, TouchableOpacity, ActivityIndicator,
  ActionSheetIOS, Alert
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Card, Divider } from 'react-native-paper'
import TrackPlayer from 'react-native-track-player'
import DoubleClick from 'react-native-double-tap'

import { siteLogo, logo } from '../../constants'
import { useStore, wait } from '../../utils'
import { SendPlayerDetails, TrackPlayerStructure } from '../../utils/media/functions'
import MediaService from '../../utils/media/MediaService'
import TrackService from '../../utils/media/TrackService'
import MediaActionSheet from './MediaActionSheet'


export function MediaDetails({ route, navigation }) {
  const { item, user, tracks } = route.params
  const [storeState, storeDispatch] = useStore()
  const [tracksLikeThis, setTracksLikeThis] = React.useState(null)
  const { isPlaying, currentTrack, queued, isLoading } = storeState
  const mediaService = MediaService()
  const trackService = TrackService()

  const handleAddMediaLike = () => {
    mediaService.addMediaLike(item.acid)
  }

  const addQueue = async (item) => {
    MediaActionSheet()
    // console.log(TrackPlayerStructure(item))
    // await TrackPlayer.setupPlayer()
    // await TrackPlayer.add(TrackPlayerStructure(item))
    // console.log('Done')
    // setTimeout(async () => {
    //   const queued = await TrackPlayer.getQueue()
    //   storeDispatch.setQueued(queued)
    // }, 250)
  }

  const playNow = async (item) => {
    setTimeout(async () => {
      if (!isPlaying && !currentTrack) {
        storeDispatch.setLoading(true)
        storeDispatch.setPlaying(true)
        storeDispatch.setCurrentTrack(item)
        await TrackPlayer.setupPlayer()
        await TrackPlayer.reset()
        await TrackPlayer.add(TrackPlayerStructure(item))
        await TrackPlayer.play()
        mediaService.addMediaPlay(item.acid)
      } else if (!isPlaying && currentTrack.acid === item.acid) {
        storeDispatch.setPlaying(true)
        TrackPlayer.play()
      } else if (isPlaying && currentTrack.acid === item.acid) {
        storeDispatch.setPlaying(false)
        TrackPlayer.pause()
      } else {
        storeDispatch.setLoading(true)
        storeDispatch.setPlaying(true)
        storeDispatch.setCurrentTrack(item)
        await TrackPlayer.setupPlayer()
        await TrackPlayer.reset()
        await TrackPlayer.add(TrackPlayerStructure(item))
        await TrackPlayer.play()
        mediaService.addMediaPlay(item.acid)
      }
      const queued = await TrackPlayer.getQueue()
      storeDispatch.setQueued(queued)
    }, 200)
  }

  React.useEffect(() => {
    if (tracks.length > 0) {
      let tracksLikeThis = tracks.filter(t => t.acid !== item.acid &&
        JSON.stringify(t).includes(item.genre)).slice(0, 3)
      setTracksLikeThis(tracksLikeThis.length ? tracksLikeThis : tracks.slice(0, 3))
      storeDispatch.setLoading(false)
    }
  }, [tracks])


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  const handleNextMedia = () => {
    TrackPlayer.skipToNext()
      .then(async res => {
        const currentTrk = mediaService.getTrackById(await TrackPlayer.getCurrentTrack())
        console.log(currentTrk)
        navigation.replace('MediaDetails', {
          item: currentTrk,
          user: user,
          tracks: tracks
        })
      })
      .catch(err => console.log('ERROR'))
  }

  const handleRepeatMedia = () => {
    TrackPlayer.seekTo(0)
      .then(res => console.log('Done'))
      .catch(err => console.log('ERROR'))

  }


  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 60, left: 25, zIndex: 10 }}>
        <Text style={{ fontWeight: '700' }}>
          <Icons style={{ fontSize: 25, color: 'white' }} name='arrow-down' />
        </Text>
      </TouchableOpacity>

      <DoubleClick doubleTap={() => navigation.goBack()}>
        <FastImage source={item.art_link ? { uri: item.art_link } : logo}
          style={{ height: 400, width: '100%', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
          resizeMode='cover' />
      </DoubleClick>

      <View style={{ flex: 1, alignItems: 'center', marginTop: 10 }}>
        <Text style={{ fontWeight: '700', fontSize: 20 }}>{item.artist}</Text>
        <Text style={{}}>{item.title}</Text>
      </View>
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginHorizontal: 20
      }}>
        <TouchableOpacity onPress={handleRepeatMedia}>
          <Icons name='repeat' size={65} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => wait(() => addQueue(item))}>
          <Icons name='plus' size={30} />
        </TouchableOpacity>

        {!isLoading ?
          <TouchableOpacity onPress={() => wait(() => playNow(item), 250)}>
            {isPlaying && currentTrack.acid !== item.acid &&
              <Icons name='play-circle' size={100} />}
            {isPlaying && currentTrack.acid === item.acid &&
              <Icons name='pause-circle' size={100} />}
            {!isPlaying && <Icons name='play-circle' size={100} />}
          </TouchableOpacity> :
          <ActivityIndicator style={{
            margin: 9,
            backgroundColor: 'black',
            padding: 31, borderRadius: 100 / 2
          }} />}

        <TouchableOpacity onPress={() => wait(() => handleAddMediaLike())}>
          <Icons name='heart-outline' size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => wait(() => handleNextMedia())}>
          <Icons name='skip-next' size={65} />
        </TouchableOpacity>
      </View>

      <Divider style={{ marginTop: 10 }} />

      <View>
        <Text style={{ fontWeight: '700', padding: 20, fontSize: 15 }}>
          {user.name}, checkout more songs like this
        </Text>
      </View>

      <View>
        {tracksLikeThis && tracksLikeThis.map((itm, idx) => (
          <TouchableOpacity key={idx}
            onPress={() => navigation.push('MediaDetails', {
              item: itm, user: user, tracks: tracks
            })}
            style={{
              flexDirection: 'row', paddingLeft: 20, paddingBottom: 10,
              alignItems: 'center'
            }}>
            <FastImage source={itm.art_link ? { uri: itm.art_link } : logo}
              style={{
                height: 50, width: 50, borderRadius: 50 / 2
              }} />
            <View style={{ paddingLeft: 15 }}>
              <Text style={{ padding: 0 }}>
                <Text style={{ fontWeight: '700' }}>{itm.artist}</Text> {itm.title}
              </Text>
              <Text style={{ opacity: .5 }}>{itm.genre}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>


      {
        queued.length > 0 &&
        <View>
          <Divider />

          <Text style={{ fontWeight: '700', padding: 20, fontSize: 15 }}>
            Upcoming tracks
        </Text>
        </View>
      }

      <View>
        {queued && queued.map((itm, idx) => (
          <TouchableOpacity key={idx}
            onPress={() => navigation.push('MediaDetails', {
              item: itm, user: user, tracks: tracks
            })}
            style={{
              flexDirection: 'row', paddingLeft: 20, paddingBottom: 10,
              alignItems: 'center'
            }}>
            <FastImage source={itm.art_link ? { uri: itm.art_link } : logo}
              style={{
                height: 50, width: 50, borderRadius: 50 / 2
              }} />
            <View style={{ paddingLeft: 15 }}>
              <Text style={{ padding: 0 }}>
                <Text style={{ fontWeight: '700' }}>{itm.artist}</Text> {itm.title}
              </Text>
              <Text style={{ opacity: .5 }}>
                {currentTrack.acid === itm.acid ? 'Currently playing' : ''}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {/* <Text style={{ height: 500 }}>
        {JSON.stringify(route.params, null, 2)}
      </Text> */}
    </ScrollView >
  )
}