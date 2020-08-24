import React from 'react'
import {
  ScrollView, View, Text, TouchableOpacity, ActivityIndicator,
  ActionSheetIOS, Alert
} from 'react-native'
import FastImage from 'react-native-fast-image'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Divider } from 'react-native-paper'
import TrackPlayer from 'react-native-track-player'
import DoubleClick from 'react-native-double-tap'
import Snackbar from 'react-native-snackbar'
import Button from 'react-native-button'

import { siteLogo, logo } from '../../constants'
import { useStore, wait } from '../../utils'
import { SendPlayerDetails, TrackPlayerStructure } from '../../utils/media/functions'
import MediaService from '../../utils/media/MediaService'
import TrackService from '../../utils/media/TrackService'
import MediaActionSheet from './MediaActionSheet'
import LocalAlert from '../../utils/notifs/LocalAlert'
import { PreviousTapped } from './functions/PreviousTapped'


export function MediaDetails({ route, navigation }) {
  const { item, user, tracks } = route.params
  const [storeState, storeDispatch] = useStore()
  const [tracksLikeThis, setTracksLikeThis] = React.useState(null)
  const { isPlaying, currentTrack, queued, isLoading } = storeState
  const mediaService = MediaService()
  const trackService = TrackService()
  const [pageTrack, setPageTrack] = React.useState(null)
  const [nextTrack, setNextTrack] = React.useState(null)
  const [viewingTrack, setViewingTrack] = React.useState(null)
  const focusedTrack = pageTrack ? pageTrack : item
  const [isLiked, setIsLiked] = React.useState(false)


  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
    setViewingTrack(item)
  }, [])


  React.useEffect(() => {
    if (tracks.length > 0) {
      let tracksLikeThis = tracks.filter(t => t?.acid !== viewingTrack?.acid &&
        JSON.stringify(t).includes(viewingTrack?.genre)).slice(0, 3)
      setTracksLikeThis(tracksLikeThis.length ? tracksLikeThis : tracks.slice(0, 3))
      storeDispatch.setLoading(false)
    }
  }, [tracks])

  React.useEffect(() => {
    if (viewingTrack?.acid) readIsLiked()
  }, [viewingTrack])


  const readIsLiked = async () => {
    try {
      const result = await mediaService.isMediaLiked(viewingTrack?.acid, user?.uid)
      setIsLiked(result?.liked)
    } catch {

    }
  }

  const handleAddMediaLike = async () => {
    if (!viewingTrack?.acid) {
      console.log('Missing Track Param')
      return
    }
    let result = await mediaService.addMediaLike(user, viewingTrack, !isLiked)
    setIsLiked(result?.liked)
    result?.liked && LocalAlert('Media Liked', `You liked ${viewingTrack.title} by ${viewingTrack.artist}`)
  }

  const handlePreviousTapped = async () => {
    const data = await PreviousTapped(tracks, user.uid)
    console.log(data)
  }

  const handleAddTapped = () => MediaActionSheet(viewingTrack ? viewingTrack : item, storeDispatch)

  const handlePlayTapped = async () => {
    const nowQueued = await TrackPlayer.getQueue()
    const state = await TrackPlayer.getState()
    const isViewingRequest = viewingTrack?.acid === item?.acid
    const isCurrentRequest = viewingTrack?.acid === currentTrack?.acid
    const thisTrack = route.params.item

    if (!nowQueued.length) {
      console.log('Queue is Empty, Setting playlist . .')
      await trackService.setPlaylist()
    }

    if (isPlaying) {
      trackService.pause()
    } else {
      let currentId = await TrackPlayer.getCurrentTrack()
      let currentTrack = tracks.filter(t => t?.acid === currentId)[0]

      console.log(currentId ? `${currentId} is the current track id` : 'there is no current track')
      await TrackPlayer.skip(currentId)
      await trackService.play(currentTrack)
      console.log(currentTrack.title)
    }
  }

  const handleNextTapped = async () => {
    try {
      await TrackPlayer.skipToNext()
      let nextId = await TrackPlayer.getCurrentTrack()
      let crtTrk = tracks.filter(t => t.acid === nextId)[0]
      console.log('Next Tapped', crtTrk.title)
      setViewingTrack(crtTrk)
      trackService.play(crtTrk)
      const result = await mediaService.isMediaLiked(crtTrk.acid, user.uid)
      setIsLiked(result?.liked)
    } catch (err) {
      if (err.message.indexOf('left') !== -1) {
        LocalAlert('Notification', err.message.replace('is', 'are'))
      }
    }
  }

  const handleSelectedTapped = async item => {
    await TrackPlayer.skip(item.acid)
    await trackService.play(item)
    setPageTrack(item)
    console.log('[SELECTEDREQUEST] Play')
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
          <Icons style={{ fontSize: 25, color: 'white' }} name='arrow-left' />
        </Text>
      </TouchableOpacity>

      <DoubleClick doubleTap={() => navigation.goBack()}>
        <FastImage source={currentTrack?.art_link ? { uri: currentTrack.art_link } : logo}
          style={{ height: 400, width: '100%', borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
          resizeMode='cover' />
      </DoubleClick>

      <View style={{
        flex: 1, alignItems: 'center', marginTop: 10, justifyContent: 'center',
        flexDirection: 'row'
      }}>
        {viewingTrack?.acid !== item?.acid ?
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: '700', fontSize: 20 }}>{item?.artist ? item.artist : item.artist}</Text>
            <Text style={{ marginLeft: 5, marginTop: 5 }}>{item?.title ? item.title : item.title}</Text>
            <Button onPress={() => {
              TrackPlayer.skip(item.acid)
              trackService.play(item)
            }} style={{ fontSize: 13, marginTop: 6, marginLeft: 4 }}>
              Play this</Button>
          </View>
          :
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontWeight: '700', fontSize: 20 }}>{currentTrack?.artist ? currentTrack.artist : item.artist}</Text>
            <Text style={{ marginLeft: 5, marginTop: 5 }}>{currentTrack?.title ? currentTrack.title : item.title}</Text>
          </View>
        }


      </View>
      <View style={{ alignItems: 'center', marginTop: 4 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginRight: 5, color: 'gray', marginTop: 1 }}>{isPlaying ? 'Playing' : 'Paused'}</Text>
          <Text style={{ fontWeight: '700', fontSize: 15 }}>{currentTrack?.artist ? currentTrack.artist : item.artist}</Text>
          <Text style={{ marginLeft: 5, marginTop: 1, fontSize: 13 }}>{currentTrack?.title ? currentTrack.title : item.title}</Text>
        </View>
      </View>


      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginHorizontal: 20
      }}>
        <TouchableOpacity onPress={handlePreviousTapped}>
          <Icons name='skip-previous' size={65} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => wait(() => handleAddTapped(viewingTrack))}>
          <Icons name='plus' size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => wait(() => handlePlayTapped(viewingTrack), 250)}>
          {!isLoading ?
            <View>{isPlaying ? <Icons name='pause-circle' size={100} /> : <Icons name='play-circle' size={100} />}</View>
            :
            <ActivityIndicator style={{
              margin: 9,
              backgroundColor: 'black',
              padding: 31, borderRadius: 100 / 2
            }} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => wait(() => handleAddMediaLike())}>
          <Icons name={isLiked ? 'heart' : 'heart-outline'} size={30} style={{ color: isLiked ? 'red' : 'black' }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => wait(() => handleNextTapped())}>
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
          <TouchableOpacity key={itm.acid}
            onPress={() => handleSelectedTapped(itm)}
            style={{
              flexDirection: 'row', paddingLeft: 20, paddingBottom: 10,
              alignItems: 'center'
            }}>
            <FastImage source={itm?.art_link ? { uri: itm.art_link } : logo}
              style={{
                height: 50, width: 50, borderRadius: 50 / 2
              }} />
            <View style={{ paddingLeft: 15 }}>
              <Text style={{ padding: 0 }}>
                <Text style={{ fontWeight: '700' }}>{itm.artist}</Text> {itm.title} {itm.acid === currentTrack.acid &&
                  <Text style={{ color: 'purple', fontWeight: '700' }}>is Playing</Text>}
              </Text>
              <Text style={{ opacity: .5 }}>{itm.genre}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>


      {nextTrack > 0 &&
        <View>
          <Divider />

          <Text style={{ fontWeight: '700', padding: 20, fontSize: 15 }}>
            Next track is {nextTrack.title}
          </Text>
        </View>}

      {queued.length > 0 &&
        <View>
          <Divider />

          <Text style={{ fontWeight: '700', padding: 20, fontSize: 15 }}>
            Upcoming tracks
        </Text>
        </View>}

      <View>
        {queued && queued.map((itm, idx) => (
          <TouchableOpacity key={itm.acid}
            onPress={() => handleSelectedTapped(itm)}
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